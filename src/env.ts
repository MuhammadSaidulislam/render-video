import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  SUPABASE_URL: z.string().url("SUPABASE_URL must be a valid URL"),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, "SUPABASE_SERVICE_ROLE_KEY is required"),
  SUPABASE_STORAGE_BUCKET: z.string().default("exports"),
  RENDER_SECRET: z.string().min(8, "RENDER_SECRET must be at least 8 characters"),
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(["development", "production", "test"]).default("production"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌  Invalid environment variables:");
  parsed.error.issues.forEach((issue) => {
    console.error(`   ${issue.path.join(".")}: ${issue.message}`);
  });
  process.exit(1);
}

export const env = parsed.data;