import { bundle } from "@remotion/bundler";
import { renderMedia } from "@remotion/renderer";
import path from "path";
import fs from "fs";
import { log } from "console";

export async function renderSkeletonExport(payload, exportId) {
  // Ensure output folder exists
  if (!fs.existsSync("./output")) fs.mkdirSync("./output");

  const bundleLocation = await bundle({
    entryPoint: path.resolve("./remotion/entry.jsx"), // your entry
  });

  const output = `./output/${exportId}.mp4`;

  log(`[Render Start] exportId=${exportId}------${output}`);
  await renderMedia({
    composition: "MyVideo",
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation: output,
    inputProps: { title: payload.title || "Hello World" },
  });

  return { url: output };
}