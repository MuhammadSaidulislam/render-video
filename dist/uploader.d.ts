/**
 * Uploads the rendered mp4 to Supabase Storage.
 * Returns the public URL of the uploaded file.
 *
 * Storage path: exports/{userId}/{exportId}.mp4
 */
export declare function uploadToSupabase(filePath: string, exportId: string, userId: string): Promise<string>;
//# sourceMappingURL=uploader.d.ts.map