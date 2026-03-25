"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToSupabase = uploadToSupabase;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const supabase_js_1 = require("@supabase/supabase-js");
const env_1 = require("./env");
// Singleton Supabase client (service role — can write to storage)
const supabase = (0, supabase_js_1.createClient)(env_1.env.SUPABASE_URL, env_1.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
});
/**
 * Uploads the rendered mp4 to Supabase Storage.
 * Returns the public URL of the uploaded file.
 *
 * Storage path: exports/{userId}/{exportId}.mp4
 */
async function uploadToSupabase(filePath, exportId, userId) {
    const fileName = path_1.default.basename(filePath);
    const storagePath = `${userId}/${fileName}`;
    const bucket = env_1.env.SUPABASE_STORAGE_BUCKET;
    console.log(`[uploader] ${exportId} uploading to ${bucket}/${storagePath}`);
    const fileBuffer = fs_1.default.readFileSync(filePath);
    const fileSizeMb = (fileBuffer.byteLength / 1024 / 1024).toFixed(2);
    console.log(`[uploader] ${exportId} file size: ${fileSizeMb} MB`);
    const { error } = await supabase.storage
        .from(bucket)
        .upload(storagePath, fileBuffer, {
        contentType: "video/mp4",
        upsert: true, // overwrite if same exportId is re-run
        cacheControl: "3600",
    });
    if (error) {
        throw new Error(`Supabase upload failed: ${error.message}`);
    }
    // Get the public URL
    const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(storagePath);
    if (!urlData?.publicUrl) {
        throw new Error("Failed to get public URL from Supabase after upload");
    }
    console.log(`[uploader] ${exportId} ✅ uploaded → ${urlData.publicUrl.substring(0, 80)}...`);
    return urlData.publicUrl;
}
//# sourceMappingURL=uploader.js.map