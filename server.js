import express from "express";
import cors from "cors";
import { renderSkeletonExport } from "./render.js";

const app = express();
app.use(cors());
app.use(express.json());

const exportsStore = new Map();

// --- endpoints ---
app.post("/render", (req, res) => {
  const payload = req.body;
  const exportId = `skel-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  // create in-memory export
  exportsStore.set(exportId, { status: "rendering", videoUrl: null });

  // Immediately respond to Postman/HTTP request
  res.json({ ok: true, exportId, status: "rendering" });

  // Run render asynchronously
  (async () => {
    try {
      const result = await renderSkeletonExport(payload, exportId);
      exportsStore.set(exportId, { status: "done", videoUrl: result.url });
      console.log(`[Render Done] exportId=${exportId}`);
    } catch (err) {
      exportsStore.set(exportId, { status: "error", error: err.message });
      console.error(`[Render Error] exportId=${exportId}`, err);
    }
  })();
});

app.get("/status", (req, res) => {
  const { exportId } = req.query;
  if (!exportId) return res.status(400).json({ error: "exportId required" });
  res.json(exportsStore.get(exportId) || { status: "not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Render worker running on port ${PORT}`));