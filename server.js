import express from "express";
import cors from "cors";
import { renderSkeletonExport } from "./render.js";

const app = express();
app.use(cors());
app.use(express.json());

// In-memory store for export status
const exportsStore = new Map();

function createExportWithId(exportId, userId) {
  exportsStore.set(exportId, {
    exportId,
    userId,
    status: "rendering",
    progress: 0,
    videoUrl: null,
    error: null,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  return exportsStore.get(exportId);
}

function updateExport(exportId, updates) {
  if (!exportsStore.has(exportId)) return null;
  const current = exportsStore.get(exportId);
  exportsStore.set(exportId, { ...current, ...updates, updatedAt: Date.now() });
  return exportsStore.get(exportId);
}

// --- /render ---
app.post("/render", async (req, res) => {
  const payload = req.body;
  const exportId = payload.exportId || `skel-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  createExportWithId(exportId, payload.userId || "demo_user");

  // Start render in background
  (async () => {
    try {
      const result = await renderSkeletonExport(payload, exportId, (progress) => {
        updateExport(exportId, { progress }); // progress callback
      });
      updateExport(exportId, { status: "done", videoUrl: result.url, progress: 100 });
    } catch (err) {
      updateExport(exportId, { status: "error", error: err.message });
      console.error(`[Render Error] exportId=${exportId}`, err);
    }
  })();

  // Respond immediately
  res.json({ ok: true, exportId, status: "rendering" });
});

// --- /status ---
app.get("/status", (req, res) => {
  const exportId = req.query.exportId;
  if (!exportId) return res.status(400).json({ error: "exportId required" });
  const status = exportsStore.get(exportId);
  res.json(status || { status: "not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Render worker running on port ${PORT}`));