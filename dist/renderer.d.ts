import type { RenderPayload } from "./types";
/**
 * Renders a video for the given payload.
 * Returns the path to the output .mp4 file.
 */
export declare function renderVideo(payload: RenderPayload): Promise<string>;
/**
 * Cleans up the work directory after upload is done.
 */
export declare function cleanupWorkDir(exportId: string): void;
//# sourceMappingURL=renderer.d.ts.map