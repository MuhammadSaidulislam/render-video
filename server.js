import express from "express";
import cors from "cors";
import { fork } from "child_process";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

const exportsStore = new Map();

app.post("/render", (req, res) => {
  const payload = req.body;
  const exportId = `skel-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  // Store status immediately
  exportsStore.set(exportId, { status: "rendering", videoUrl: null });

  // Respond immediately to client
  res.json({ ok: true, exportId, status: "rendering" });

  // Run render in a separate process
  const renderProcess = fork(path.resolve("./renderWorker.js"));

  renderProcess.send({ payload, exportId });

  renderProcess.on("message", (msg) => {
    if (msg.status === "done") {
      exportsStore.set(exportId, { status: "done", videoUrl: msg.url });
      console.log(`[Render Done] exportId=${exportId}`);
    } else if (msg.status === "error") {
      exportsStore.set(exportId, { status: "error", error: msg.error });
      console.error(`[Render Error] exportId=${exportId}`, msg.error);
    }
  });
});

app.get("/status", (req, res) => {
  const { exportId } = req.query;
  if (!exportId) return res.status(400).json({ error: "exportId required" });
  res.json(exportsStore.get(exportId) || { status: "not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Render worker running on port ${PORT}`));