"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    SUPABASE_URL: zod_1.z.string().url("SUPABASE_URL must be a valid URL"),
    SUPABASE_SERVICE_ROLE_KEY: zod_1.z.string().min(1, "SUPABASE_SERVICE_ROLE_KEY is required"),
    SUPABASE_STORAGE_BUCKET: zod_1.z.string().default("exports"),
    RENDER_SECRET: zod_1.z.string().min(8, "RENDER_SECRET must be at least 8 characters"),
    PORT: zod_1.z.coerce.number().default(3000),
    NODE_ENV: zod_1.z.enum(["development", "production", "test"]).default("production"),
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    console.error("❌  Invalid environment variables:");
    parsed.error.issues.forEach((issue) => {
        console.error(`   ${issue.path.join(".")}: ${issue.message}`);
    });
    process.exit(1);
}
exports.env = parsed.data;
//# sourceMappingURL=env.js.map