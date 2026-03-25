const { bundle } = require("@remotion/bundler");
const { renderMedia } = require("@remotion/renderer");
const path = require("path");
const fs = require("fs");

async function run() {
  const exportId = process.argv[2];

  console.log("🎬 Rendering:", exportId);

  const bundleLocation = await bundle({
    entryPoint: path.resolve("./remotion/entry.jsx"),
  });

  const outputPath = path.resolve(`./output/${exportId}.mp4`);

  await renderMedia({
    composition: "MyVideo",
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation: outputPath,
    inputProps: { title: "Railway Video" },
  });

  console.log("✅ Render done:", outputPath);
}

run().catch((err) => {
  console.error("❌ Render failed:", err);
});