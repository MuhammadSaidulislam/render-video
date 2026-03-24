import { bundle } from "@remotion/bundler";
import { renderMedia } from "@remotion/renderer";
import path from "path";
import fs from "fs";

export async function renderSkeletonExport(payload, exportId, onProgress) {
  const outputDir = path.resolve("./output");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  const bundleLocation = await bundle({
    entryPoint: path.resolve("./remotion/entry.jsx"),
  });

  const output = path.join(outputDir, `${exportId}.mp4`);

  // Start render
  await renderMedia({
    serveUrl: bundleLocation,
    composition: "MyVideo",
    codec: "h264",
    outputLocation: output,
    inputProps: { title: payload.scenes?.[0]?.title || "Demo Video" },
    onProgress, // callback to report percentage
  });

  return { url: output };
}