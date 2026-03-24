// render.js
import { bundle } from "@remotion/bundler";
import { renderMedia } from "@remotion/renderer";
import path from "path";

// Function to render a video
export async function renderSkeletonExport(payload, exportId) {
  const bundleLocation = await bundle({
    entryPoint: path.resolve("./remotion/entry.jsx"),
  });

  const output = `./output/${exportId}.mp4`;

  await renderMedia({
    composition: "MyVideo",
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation: output,
    inputProps: { title: payload.title || "Hello" },
  });

  console.log(`✅ Render finished: ${output}`);
  return { url: output };
}

// --- TEST CALL --- only for local testing
if (process.argv[2] === "--test") {
  const payload = { title: "Local Test Video" };
  const exportId = `test-${Date.now()}`;

  renderSkeletonExport(payload, exportId)
    .then(() => console.log("Local test render done"))
    .catch((err) => console.error("Render failed:", err));
}