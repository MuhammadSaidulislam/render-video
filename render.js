import { bundle } from "@remotion/bundler";
import { renderMedia } from "@remotion/renderer";
import path from "path";
import fs from "fs";

export async function renderSkeletonExport(payload, exportId, onProgress) {
  const bundleLocation = path.resolve("./remotion/entry.jsx");
  const output = `./output/${exportId}.mp4`;

  const totalFrames = 240; // same as your composition

  await renderMedia({
    composition: "MyVideo",
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation: output,
    inputProps: { title: payload.title || "Hello" },
    onProgress: (p) => {
      const percentage = Math.floor(p * 100);
      onProgress(percentage); // call back to update exportsStore
    },
  });

  return { url: output };
}