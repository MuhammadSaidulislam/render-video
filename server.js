const express = require("express");
const cors = require("cors"); // ✅ import cors
const { bundle } = require("@remotion/bundler");
const { renderMedia } = require("@remotion/renderer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors()); // ✅ enable CORS for all origins
app.use(express.json());

app.post("/render", async (req, res) => {
  try {
    const { composition = "MyVideo", inputProps = {} } = req.body;

    const bundleLocation = await bundle({
      entryPoint: path.resolve("./remotion/index.tsx"),
    });

    const outputDir = path.resolve("./output");
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

    const outputPath = path.join(outputDir, `${Date.now()}.mp4`);

    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: "h264",
      outputLocation: outputPath,
      inputProps,
    });

    res.json({ success: true, file: outputPath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.use("/output", express.static("output")); // ✅ serve video files

app.listen(5000, () => console.log("Worker running on port 5000"));