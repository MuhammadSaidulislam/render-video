"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBundlePath = getBundlePath;
const path_1 = __importDefault(require("path"));
const bundler_1 = require("@remotion/bundler");
let cachedBundlePath = null;
let bundlePromise = null;
/**
 * Returns the Remotion bundle path.
 * Bundles exactly once on first call — subsequent calls return the cached path.
 * Thread-safe: concurrent calls during startup share the same promise.
 */
async function getBundlePath() {
    if (cachedBundlePath)
        return cachedBundlePath;
    // If a bundle is already in progress, wait for it
    if (bundlePromise)
        return bundlePromise;
    bundlePromise = (async () => {
        const entryPoint = path_1.default.resolve(__dirname, "./remotion/index.ts");
        console.log("[bundle] Starting Remotion bundle...");
        console.log("[bundle] Entry point:", entryPoint);
        const start = Date.now();
        const bundlePath = await (0, bundler_1.bundle)({
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
//# sourceMappingURL=bundle.js.map