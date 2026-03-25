import path from "path";
import { bundle } from "@remotion/bundler";
import { ensureBrowser } from "@remotion/renderer";

let cachedBundlePath: string | null = null;
let bundlePromise: Promise<string> | null = null;

export const BROWSER = {
  browserExecutable: "/usr/bin/chromium",
  onBrowserDownload: () => ({
    version: null as null,
    browserExecutable: "/usr/bin/chromium",
    onProgress: () => undefined,
  }),
};

export async function getBundlePath(): Promise<string> {
  if (cachedBundlePath) return cachedBundlePath;
  if (bundlePromise) return bundlePromise;

  process.env.CHROMIUM_FLAGS = [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    "--disable-gpu",
    "--no-first-run",
    "--no-zygote",
    "--single-process",
  ].join(" ");

  bundlePromise = (async () => {
    await ensureBrowser({
      ...BROWSER,
    });

    const entryPoint = path.resolve(__dirname, "../src/remotion/index.ts");

    console.log("[bundle] Starting Remotion bundle...");
    console.log("[bundle] Entry point:", entryPoint);

    const start = Date.now();

    const bundlePath = await bundle({
      entryPoint,
      onProgress: (progress) => {
        if (progress % 25 === 0) {
          console.log(`[bundle] webpack progress: ${progress}%`);
        }
      },
      webpackOverride: (config) => config,
    });

    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`[bundle] ✅ Bundle ready in ${elapsed}s → ${bundlePath}`);

    cachedBundlePath = bundlePath;
    return bundlePath;
  })();

  return bundlePromise;
}