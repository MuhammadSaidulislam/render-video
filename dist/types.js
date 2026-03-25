"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderPayloadSchema = exports.SceneSchema = exports.CaptionSchema = exports.CaptionStyleSchema = void 0;
const zod_1 = require("zod");
// ─── Caption style ────────────────────────────────────────────────────────────
exports.CaptionStyleSchema = zod_1.z.object({
    fontFamily: zod_1.z.string().optional(),
    fontSize: zod_1.z.number().optional(),
    color: zod_1.z.string().optional(),
    backgroundColor: zod_1.z.string().optional(),
    fontWeight: zod_1.z.string().optional(),
    textAlign: zod_1.z.enum(["left", "center", "right"]).optional(),
    position: zod_1.z.enum(["top", "bottom", "center"]).optional(),
}).passthrough();
// ─── Caption ─────────────────────────────────────────────────────────────────
exports.CaptionSchema = zod_1.z.object({
    text: zod_1.z.string(),
    startFrame: zod_1.z.number(),
    endFrame: zod_1.z.number(),
    style: exports.CaptionStyleSchema.optional(),
}).passthrough();
// ─── Scene ───────────────────────────────────────────────────────────────────
exports.SceneSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    imageUrl: zod_1.z.string().optional(),
    videoUrl: zod_1.z.string().optional(),
    durationInFrames: zod_1.z.number().int().positive(),
    text: zod_1.z.string().optional(),
    style: zod_1.z.record(zod_1.z.unknown()).optional(),
    transition: zod_1.z.string().optional(),
}).passthrough();
// ─── Render payload (must match what Vercel route.ts sends) ──────────────────
exports.RenderPayloadSchema = zod_1.z.object({
    scenes: zod_1.z.array(exports.SceneSchema).min(1),
    voiceoverUrl: zod_1.z.string().default(""),
    musicUrl: zod_1.z.string().default(""),
    musicVolume: zod_1.z.number().min(0).max(1).default(0.3),
    captions: zod_1.z.array(exports.CaptionSchema).default([]),
    defaultCaptionStyle: exports.CaptionStyleSchema.default({}),
    exportId: zod_1.z.string().min(1),
    userId: zod_1.z.string().min(1),
});
//# sourceMappingURL=types.js.map