import express from "express";
import cors from "cors";
import { renderSkeletonExport } from "./render.js";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

const outputDir = path.resolve("./output");
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

// In-memory store for exports
const exportsStore = new Map();

async function createExportWithId(exportId, userId) {
  exportsStore.set(exportId, {
    exportId,
    userId,
    status: "rendering",
    progress: 0,
    videoUrl: null,
    error: null,
    createdAt: Date.now(),
    updatedAt: Date.now()
  });
  return exportsStore.get(exportId);
}

async function updateExport(exportId, updates) {
  if (!exportsStore.has(exportId)) throw new Error("Export not found: " + exportId);
  const current = exportsStore.get(exportId);
  exportsStore.set(exportId, { ...current, ...updates, updatedAt: Date.now() });
  return exportsStore.get(exportId);
}

async function getExportStatus(exportId) {
  return exportsStore.get(exportId) || null;
}

// --- /render ---
app.post("/render", async (req, res) => {
  try {
    const payload = req.body;
    const exportId = `skel-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    await createExportWithId(exportId, payload.userId || "demo_user");

    // Respond immediately
    res.json({ ok: true, exportId, status: "rendering" });

    // Start background rendering
    setImmediate(async () => {
      try {
        await renderSkeletonExport(payload, exportId, (progress) => {
          updateExport(exportId, { progress });
        });
        await updateExport(exportId, { status: "done", progress: 100, videoUrl: `output/${exportId}.mp4` });
      } catch (err) {
        await updateExport(exportId, { status: "error", error: err.message });
        console.error(`[Render Error] ${exportId}`, err);
      }
    });
  } catch (err) {
    console.error("[Render API Error]", err);
    res.status(500).json({ error: "Failed to start render" });
  }
});

// --- /status ---
app.get("/status", async (req, res) => {
  const { exportId } = req.query;
  if (!exportId) return res.status(400).json({ error: "exportId required" });
  const status = await getExportStatus(exportId);
  res.json(status || { status: "not found" });
});
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});
app.get("/test", (req, res) => {
  res.json({ ok: true });
});
// --- start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Render worker running on port ${PORT}`));