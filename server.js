const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

// ensure output folder exists
if (!fs.existsSync("./output")) {
  fs.mkdirSync("./output");
}

// in-memory store
const exportsStore = new Map();

// create export
function createExport(exportId) {
  exportsStore.set(exportId, {
    exportId,
    status: "rendering",
    progress: 0,
    videoUrl: null,
    error: null,
  });
}

// update export
function updateExport(exportId, data) {
  const current = exportsStore.get(exportId);
  exportsStore.set(exportId, { ...current, ...data });
}

// get export
function getExport(exportId) {
  return exportsStore.get(exportId);
}

// ✅ health check
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// ✅ test route
app.get("/test", (req, res) => {
  res.json({ ok: true });
});

// 🚀 /render
app.post("/render", (req, res) => {
  const exportId = `skel-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  createExport(exportId);

  // respond immediately
  res.json({ ok: true, exportId, status: "rendering" });

  // run render in separate process
  const child = spawn("node", [path.resolve("./render.js"), exportId], {
    detached: true,
    stdio: "ignore",
  });

  child.unref();
});

// 📊 /status
app.get("/status", (req, res) => {
  const { exportId } = req.query;
  if (!exportId) return res.status(400).json({ error: "exportId required" });

  const data = getExport(exportId);
  res.json(data || { status: "not found" });
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});