import express from "express";
import cors from "cors";
import { renderSkeletonExport } from "./render.js";
import fs from "fs";
import { log } from "console";

// Create output folder if missing
if (!fs.existsSync("./output")) fs.mkdirSync("./output");

const app = express();
app.use(cors());
app.use(express.json());

// Simple in-memory store for exports
const exportsStore = new Map();
const createExportWithId = async (exportId, userId) => {
  exportsStore.set(exportId, {
    exportId,
    userId,
    status: "rendering",
    videoUrl: null,
    error: null,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  return exportsStore.get(exportId);
};
const updateExport = async (exportId, updates) => {
  if (!exportsStore.has(exportId)) throw new Error("Export not found");
  const current = exportsStore.get(exportId);
  exportsStore.set(exportId, { ...current, ...updates, updatedAt: Date.now() });
  return exportsStore.get(exportId);
};
const getExportStatus = async (exportId) => exportsStore.get(exportId) || null;

// --- /render endpoint ---
app.post("/render", async (req, res) => {
  try {
    const payload = req.body;
    const exportId = `skel-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    await createExportWithId(exportId, payload.userId || "demo_user");

    // Run render in background
    setImmediate(async () => {
      try {
        const result = await renderSkeletonExport(payload, exportId, async (percentage) => {
          await updateExport(exportId, { progress: percentage });
          console.log(`[Render Progress] ${exportId}: ${percentage}%`);
        });

        await updateExport(exportId, { status: "done", videoUrl: result.url, progress: 100 });
        console.log(`[Render Done] ${exportId}`);
      } catch (err) {
        await updateExport(exportId, { status: "error", error: err.message });
        console.error(`[Render Error] ${exportId}`, err);
      }
    });

    // Respond immediately
    res.json({ ok: true, exportId, status: "rendering", progress: 0 });
  } catch (err) {
    console.error("[Render API Error]", err);
    res.status(500).json({ error: "Failed to start render" });
  }
});

// --- /status endpoint ---
app.get("/status", async (req, res) => {
  const { exportId } = req.query;
  log("Checking status for exportId:", exportId);
  if (!exportId) return res.status(400).json({ error: "exportId required" });
  const status = await getExportStatus(exportId);
  res.json(status || { status: "not found" });
});

// --- Start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Render worker running on port ${PORT}`));