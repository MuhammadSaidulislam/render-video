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
  // accept both naming conventions
  startFrame: z.number().optional(),
  endFrame: z.number().optional(),
  start: z.number().optional(),
  end: z.number().optional(),
  startTime: z.number().optional(),
  endTime: z.number().optional(),
  style: CaptionStyleSchema.optional(),
}).passthrough()
  .transform((caption) => ({
    ...caption,
    // normalize to startFrame/endFrame (30fps)
    startFrame:
      caption.startFrame ??
      (caption.startTime ? Math.round(caption.startTime * 30) : null) ??
      (caption.start ? Math.round(caption.start * 30) : null) ??
      0,
    endFrame:
      caption.endFrame ??
      (caption.endTime ? Math.round(caption.endTime * 30) : null) ??
      (caption.end ? Math.round(caption.end * 30) : null) ??
      30,
  }));

export type Caption = z.infer<typeof CaptionSchema>;

// ─── Scene ───────────────────────────────────────────────────────────────────

export const SceneSchema = z.object({
  id: z.string().optional(),
  imageUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  // accept both field names
  durationInFrames: z.number().int().positive().optional(),
  duration: z.number().optional(),
  durationSeconds: z.number().optional(),
  text: z.string().optional(),
  style: z.record(z.unknown()).optional(),
  transition: z.string().optional(),
}).passthrough()
  .transform((scene) => ({
    ...scene,
    // normalize to durationInFrames (30fps)
    durationInFrames:
      scene.durationInFrames ??
      (scene.durationSeconds ? Math.round(scene.durationSeconds * 30) : null) ??
      (scene.duration ? Math.round(scene.duration * 30) : null) ??
      90, // fallback: 3 seconds
  }));

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
