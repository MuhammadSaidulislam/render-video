import "./env"; // validate env before anything else
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { env } from "./env";
import { getBundlePath } from "./bundle";
import { renderVideo, cleanupWorkDir } from "./renderer";
import { uploadToSupabase } from "./uploader";
import { RenderPayloadSchema } from "./types";

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────

app.use(cors({ origin: "*" })); // restrict to your Vercel domain in production
app.use(express.json({ limit: "10mb" }));

// Request logger
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`[server] ${req.method} ${req.path}`);
  next();
});

// ─── Auth middleware ──────────────────────────────────────────────────────────

function requireSecret(req: Request, res: Response, next: NextFunction): void {
  const secret = req.headers["x-render-secret"];
  if (!secret || secret !== env.RENDER_SECRET) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

// ─── Health check ─────────────────────────────────────────────────────────────

app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    uptime: Math.round(process.uptime()),
    memory: process.memoryUsage().rss,
    env: env.NODE_ENV,
  });
});

// ─── Render endpoint ──────────────────────────────────────────────────────────

app.post("/render", requireSecret, async (req: Request, res: Response) => {
  const startTime = Date.now();
 console.log("[debug] first scene:", JSON.stringify(req.body.scenes?.[0]));
  console.log("[debug] first caption:", JSON.stringify(req.body.captions?.[0]));
  console.log("[debug] defaultCaptionStyle:", JSON.stringify(req.body.defaultCaptionStyle));

  // ── Validate payload ──────────────────────────────────────────────────────
  const parsed = RenderPayloadSchema.safeParse(req.body);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join(", ");
    console.error("[server] Invalid payload:", issues);
    res.status(400).json({ error: `Invalid payload: ${issues}` });
    return;
  }

  const payload = parsed.data;
  const { exportId, userId } = payload;

  console.log(
    `[server] /render start exportId=${exportId} userId=${userId} scenes=${payload.scenes.length}`
  );

  try {
    // ── Step 1: Render ───────────────────────────────────────────────────────
    const outputPath = await renderVideo(payload);

    // ── Step 2: Upload to Supabase ───────────────────────────────────────────
    const url = await uploadToSupabase(outputPath, exportId, userId);

    // ── Step 3: Cleanup tmp files ────────────────────────────────────────────
    cleanupWorkDir(exportId);

    const durationMs = Date.now() - startTime;
    console.log(
      `[server] /render done exportId=${exportId} durationMs=${durationMs}`
    );

    res.json({ ok: true, exportId, url, durationMs });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[server] /render error exportId=${exportId}:`, message);

    // Best-effort cleanup even on error
    cleanupWorkDir(exportId);

    res.status(500).json({ error: message, exportId });
  }
});

// ─── 404 handler ──────────────────────────────────────────────────────────────

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Not found" });
});

// ─── Start server + pre-warm bundle ───────────────────────────────────────────

const PORT = env.PORT || 3000;

app.listen(PORT, "0.0.0.0", async () => {  // ← "0.0.0.0" is critical
  console.log(`[server] 🚀 Listening on port ${PORT}`);
  console.log(`[server] Pre-warming Remotion bundle...`);

  try {
    await getBundlePath();
    console.log("[server] ✅ Ready to render");
  } catch (err) {
    console.error("[server] ❌ Bundle pre-warm failed:", err);
  }
});

export default app;
