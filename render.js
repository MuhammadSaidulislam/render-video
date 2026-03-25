import { bundle } from "@remotion/bundler";
import { renderMedia } from "@remotion/renderer";
import path from "path";

export async function renderSkeletonExport(payload, exportId, onProgress) {
  const bundleLocation = await bundle({
    entryPoint: path.resolve("./remotion/entry.jsx")
  });

  const output = path.resolve(`./output/${exportId}.mp4`);

  let lastProgress = 0;
  await renderMedia({
    composition: "MyVideo",
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation: output,
    inputProps: { title: payload.title || "Demo Video" },
    onProgress: (p) => {
      // only update if progress increased
      const percentage = Math.floor(p * 100);
      if (percentage > lastProgress) {
        lastProgress = percentage;
        if (onProgress) onProgress(percentage);
      }
    }
  });

  return { url: `output/${exportId}.mp4` };
}