import { z } from "zod";

// ─── Caption style ────────────────────────────────────────────────────────────

export const CaptionStyleSchema = z.object({
  fontFamily: z.string().optional(),
  fontSize: z.number().optional(),
  color: z.string().optional(),
  backgroundColor: z.string().optional(),
  fontWeight: z.string().optional(),
  textAlign: z.enum(["left", "center", "right"]).optional(),
  position: z.enum(["top", "bottom", "center"]).optional(),
}).passthrough();

export type CaptionStyle = z.infer<typeof CaptionStyleSchema>;

// ─── Caption ─────────────────────────────────────────────────────────────────

export const CaptionSchema = z.object({
  text: z.string(),
  startFrame: z.number(),
  endFrame: z.number(),
  style: CaptionStyleSchema.optional(),
}).passthrough();

export type Caption = z.infer<typeof CaptionSchema>;

// ─── Scene ───────────────────────────────────────────────────────────────────

export const SceneSchema = z.object({
  id: z.string().optional(),
  imageUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  durationInFrames: z.number().int().positive(),
  text: z.string().optional(),
  style: z.record(z.unknown()).optional(),
  transition: z.string().optional(),
}).passthrough();

export type Scene = z.infer<typeof SceneSchema>;

// ─── Render payload (must match what Vercel route.ts sends) ──────────────────

export const RenderPayloadSchema = z.object({
  scenes: z.array(SceneSchema).min(1),
  voiceoverUrl: z.string().default(""),
  musicUrl: z.string().default(""),
  musicVolume: z.number().min(0).max(1).default(0.3),
  captions: z.array(CaptionSchema).default([]),
  defaultCaptionStyle: CaptionStyleSchema.default({}),
  exportId: z.string().min(1),
  userId: z.string().min(1),
});

export type RenderPayload = z.infer<typeof RenderPayloadSchema>;

// ─── Render result ────────────────────────────────────────────────────────────

export interface RenderResult {
  ok: boolean;
  exportId: string;
  url: string;
  durationMs: number;
}
