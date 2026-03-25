import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { env } from "./env";

// Singleton Supabase client (service role — can write to storage)
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

/**
 * Uploads the rendered mp4 to Supabase Storage.
 * Returns the public URL of the uploaded file.
 *
 * Storage path: exports/{userId}/{exportId}.mp4
 */
export async function uploadToSupabase(
  filePath: string,
  exportId: string,
  userId: string
): Promise<string> {
  const fileName = path.basename(filePath);
  const storagePath = `${userId}/${fileName}`;
  const bucket = env.SUPABASE_STORAGE_BUCKET;

  console.log(`[uploader] ${exportId} uploading to ${bucket}/${storagePath}`);

  const fileBuffer = fs.readFileSync(filePath);
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

  console.log(
    `[uploader] ${exportId} ✅ uploaded → ${urlData.publicUrl.substring(0, 80)}...`
  );

  return urlData.publicUrl;
}
