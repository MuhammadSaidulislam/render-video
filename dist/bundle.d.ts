/**
 * Returns the Remotion bundle path.
 * Bundles exactly once on first call — subsequent calls return the cached path.
 * Thread-safe: concurrent calls during startup share the same promise.
 */
export declare function getBundlePath(): Promise<string>;
//# sourceMappingURL=bundle.d.ts.map