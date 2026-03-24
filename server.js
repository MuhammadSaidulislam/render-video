import express from "express";
import cors from "cors";
import { renderSkeletonExport } from "./render.js";

// Simple in-memory export store
const exportsStore = new Map();

async function createExport(exportId, userId) {
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
}

async function updateExport(exportId, updates) {
  const current = exportsStore.get(exportId);
  exportsStore.set(exportId, { ...current, ...updates, updatedAt: Date.now() });
  return exportsStore.get(exportId);
}

// Express setup
const app = express();
app.use(cors());
app.use(express.json());

// --- /render endpoint ---
app.post("/render", async (req, res) => {
  try {
    const payload = req.body;
    const exportId = `skel-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    await createExport(exportId, payload.userId);

    // Render video asynchronously
    renderSkeletonExport(payload, exportId)
      .then((result) => updateExport(exportId, { status: "done", videoUrl: result.url }))
      .catch((err) => updateExport(exportId, { status: "error", error: err.message }));

    res.json({ ok: true, exportId, status: "rendering" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to start render" });
  }
});

// --- /status endpoint ---
app.get("/status", (req, res) => {
  const { exportId } = req.query;
  if (!exportId) return res.status(400).json({ error: "exportId required" });
  const status = exportsStore.get(exportId) || { status: "not found" };
  res.json(status);
});

// --- Start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Render worker running on port ${PORT}`));