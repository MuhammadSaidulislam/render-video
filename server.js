// server.js
const express = require("express");
const cors = require("cors");
import { renderSkeletonExport } from "./remotion/index.js"; // Your Remotion render function

// Simple in-memory store for exports
const exportsStore = new Map();

async function createExportWithId(exportId, userId) {
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
  if (!exportsStore.has(exportId)) throw new Error("Export not found: " + exportId);
  const current = exportsStore.get(exportId);
  exportsStore.set(exportId, { ...current, ...updates, updatedAt: Date.now() });
  return exportsStore.get(exportId);
}

async function getExportStatus(exportId) {
  return exportsStore.get(exportId) || null;
}

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

// --- /render endpoint ---
app.post("/render", async (req, res) => {
  try {
    const payload = req.body;
    const exportId = `skel-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    // Create job record
    await createExportWithId(exportId, payload.userId);

    // Start video render in background (async)
    renderSkeletonExport(payload, exportId)
      .then((result) => {
        updateExport(exportId, { status: "done", videoUrl: result.url });
        console.log(`[Render Done] exportId=${exportId}`);
      })
      .catch((err) => {
        updateExport(exportId, { status: "error", error: err.message });
        console.error(`[Render Error] exportId=${exportId}`, err);
      });

    // Return immediately
    res.json({ ok: true, exportId, status: "rendering" });
  } catch (err) {
    console.error("[Render API Error]", err);
    res.status(500).json({ error: "Failed to start render" });
  }
});

// --- /status endpoint ---
app.get("/status", async (req, res) => {
  const { exportId } = req.query;
  if (!exportId) return res.status(400).json({ error: "exportId required" });

  const status = await getExportStatus(exportId);
  res.json(status || { status: "not found" });
});

// --- Start server ---
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Render worker running on port ${port}`));