import fs from "fs";
import os from "os";
import path from "path";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { getBundlePath } from "./bundle";
import type { RenderPayload } from "./types";
process.env.CHROMIUM_FLAGS = [
  "--no-sandbox",
  "--disable-setuid-sandbox",
  "--disable-dev-shm-usage",
  "--disable-gpu",
  "--no-first-run",
  "--no-zygote",
  "--single-process",
].join(" ");
const COMPOSITION_ID = "SkeletonExport";
const FPS = 30;
const WIDTH = 1080;
const HEIGHT = 1920; // 9:16 vertical — adjust to 1920x1080 for landscape

/**
 * Renders a video for the given payload.
 * Returns the path to the output .mp4 file.
 */
export async function renderVideo(payload: RenderPayload): Promise<string> {
  const { exportId, scenes } = payload;

  // ─── Paths ────────────────────────────────────────────────────────────────
  const workDir = path.join(os.tmpdir(), "remotion-exports", exportId);
  const outputPath = path.join(workDir, `${exportId}.mp4`);

  fs.mkdirSync(workDir, { recursive: true });

  console.log(`[renderer] ${exportId} workDir=${workDir}`);

  // ─── Total duration ───────────────────────────────────────────────────────
  const totalFrames = scenes.reduce(
    (sum, scene) => sum + scene.durationInFrames,
    0
  );

  console.log(
    `[renderer] ${exportId} scenes=${scenes.length} totalFrames=${totalFrames}`
  );

  // ─── Bundle ───────────────────────────────────────────────────────────────
  const bundleLocation = await getBundlePath();
// Sanitize URLs — reject relative paths, only allow full http/https URLs
function sanitizeUrl(url: string | undefined): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  console.warn(`[renderer] Skipping non-http URL: ${url}`);
  return ""; // return empty so Remotion skips it
}
  // ─── Composition input props (passed into your Remotion composition) ──────
  const inputProps = {
  scenes: payload.scenes,
  voiceoverUrl: sanitizeUrl(payload.voiceoverUrl),
  musicUrl: sanitizeUrl(payload.musicUrl),       // ← sanitized
  musicVolume: payload.musicVolume,
  captions: payload.captions,
  defaultCaptionStyle: payload.defaultCaptionStyle,
};

  // ─── Select composition (validates it exists in the bundle) ───────────────
  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: COMPOSITION_ID,
    inputProps,
  });

  // ─── Override duration with actual scene data ─────────────────────────────
  const finalComposition = {
    ...composition,
    durationInFrames: totalFrames,
    fps: FPS,
    width: WIDTH,
    height: HEIGHT,
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  let lastLoggedProgress = -1;

await renderMedia({
  composition: finalComposition,
  serveUrl: bundleLocation,
  codec: "h264",
  outputLocation: outputPath,
  inputProps,
  browserExecutable: "/usr/bin/chromium",
  chromiumOptions: {
    disableWebSecurity: true,
    gl: "swiftshader",
    ignoreCertificateErrors: true,
    headless: true,
  },
  concurrency: 1,
  onProgress: ({ progress }) => {
    const pct = Math.round(progress * 100);
    if (pct !== lastLoggedProgress && pct % 10 === 0) {
      lastLoggedProgress = pct;
      console.log(`[renderer] ${exportId} render progress: ${pct}%`);
    }
  },
});

  console.log(`[renderer] ${exportId} ✅ render complete → ${outputPath}`);
  return outputPath;
}

/**
 * Cleans up the work directory after upload is done.
 */
export function cleanupWorkDir(exportId: string): void {
  const workDir = path.join(os.tmpdir(), "remotion-exports", exportId);
  try {
    fs.rmSync(workDir, { recursive: true, force: true });
    console.log(`[renderer] ${exportId} cleanup done`);
  } catch {
    console.warn(`[renderer] ${exportId} cleanup failed (non-fatal)`);
  }
}
