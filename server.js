import express from "express";
import cors from "cors";
import { renderSkeletonExport } from "./render.js";

const app = express();
app.use(cors());
app.use(express.json());

const store = new Map();

// POST /render
app.post("/render", (req, res) => {
   const exportId = `skel-${Date.now()}`;

  renderSkeletonExport(req.body, exportId)
    .then((result) => console.log("Render done:", result.url))
    .catch((err) => console.error("Render failed:", err));

  res.json({ exportId, status: "rendering" });
});

// GET /status
app.get("/status", (req, res) => {
  res.json(store.get(req.query.exportId) || { status: "not found" });
});

app.listen(process.env.PORT || 5000, () =>
  console.log("Worker running")
);