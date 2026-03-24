import { bundle } from "@remotion/bundler";
import { renderMedia } from "@remotion/renderer";
import path from "path";

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
    inputProps: { title: payload.title || "Hello Railway" },
  });

  return { url: output };
}