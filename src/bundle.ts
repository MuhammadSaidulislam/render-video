import path from "path";
import { bundle } from "@remotion/bundler";

let cachedBundlePath: string | null = null;
let bundlePromise: Promise<string> | null = null;

/**
 * Returns the Remotion bundle path.
 * Bundles exactly once on first call — subsequent calls return the cached path.
 * Thread-safe: concurrent calls during startup share the same promise.
 */
export async function getBundlePath(): Promise<string> {
  if (cachedBundlePath) return cachedBundlePath;

  // If a bundle is already in progress, wait for it
  if (bundlePromise) return bundlePromise;

  bundlePromise = (async () => {
    const entryPoint = path.resolve(__dirname, "../src/remotion/index.ts");

    console.log("[bundle] Starting Remotion bundle...");
    console.log("[bundle] Entry point:", entryPoint);

    const start = Date.now();

    const bundlePath = await bundle({
      entryPoint,
      // Silence webpack progress spam in production logs
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
