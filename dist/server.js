"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./env"); // validate env before anything else
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./env");
const bundle_1 = require("./bundle");
const renderer_1 = require("./renderer");
const uploader_1 = require("./uploader");
const types_1 = require("./types");
const app = (0, express_1.default)();
// ─── Middleware ───────────────────────────────────────────────────────────────
app.use((0, cors_1.default)({ origin: "*" })); // restrict to your Vercel domain in production
app.use(express_1.default.json({ limit: "10mb" }));
// Request logger
app.use((req, _res, next) => {
    console.log(`[server] ${req.method} ${req.path}`);
    next();
});
// ─── Auth middleware ──────────────────────────────────────────────────────────
function requireSecret(req, res, next) {
    const secret = req.headers["x-render-secret"];
    if (!secret || secret !== env_1.env.RENDER_SECRET) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    next();
}
// ─── Health check ─────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
    res.json({
        status: "ok",
        uptime: Math.round(process.uptime()),
        memory: process.memoryUsage().rss,
        env: env_1.env.NODE_ENV,
    });
});
// ─── Render endpoint ──────────────────────────────────────────────────────────
app.post("/render", requireSecret, async (req, res) => {
    const startTime = Date.now();
    // ── Validate payload ──────────────────────────────────────────────────────
    const parsed = types_1.RenderPayloadSchema.safeParse(req.body);
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
    console.log(`[server] /render start exportId=${exportId} userId=${userId} scenes=${payload.scenes.length}`);
    try {
        // ── Step 1: Render ───────────────────────────────────────────────────────
        const outputPath = await (0, renderer_1.renderVideo)(payload);
        // ── Step 2: Upload to Supabase ───────────────────────────────────────────
        const url = await (0, uploader_1.uploadToSupabase)(outputPath, exportId, userId);
        // ── Step 3: Cleanup tmp files ────────────────────────────────────────────
        (0, renderer_1.cleanupWorkDir)(exportId);
        const durationMs = Date.now() - startTime;
        console.log(`[server] /render done exportId=${exportId} durationMs=${durationMs}`);
        res.json({ ok: true, exportId, url, durationMs });
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error(`[server] /render error exportId=${exportId}:`, message);
        // Best-effort cleanup even on error
        (0, renderer_1.cleanupWorkDir)(exportId);
        res.status(500).json({ error: message, exportId });
    }
});
// ─── 404 handler ──────────────────────────────────────────────────────────────
app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
});
// ─── Start server + pre-warm bundle ───────────────────────────────────────────
const PORT = env_1.env.PORT;
app.listen(PORT, async () => {
    console.log(`[server] 🚀 Listening on port ${PORT}`);
    console.log(`[server] Pre-warming Remotion bundle...`);
    try {
        await (0, bundle_1.getBundlePath)(); // bundle once at startup — all renders reuse this
        console.log("[server] ✅ Ready to render");
    }
    catch (err) {
        console.error("[server] ❌ Bundle pre-warm failed:", err);
        // Don't crash — first render will attempt to bundle again
    }
});
exports.default = app;
//# sourceMappingURL=server.js.map