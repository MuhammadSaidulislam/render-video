import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  Img,
  Video,
  interpolate,
  Easing,
} from "remotion";
import type { SkeletonExportProps } from "../Root";
import type { Scene, Caption } from "../../types";

// ─── Scene component ──────────────────────────────────────────────────────────

const SceneItem: React.FC<{ scene: Scene; durationInFrames: number }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });

  const videoSrc = scene.videoUrl || (scene as any).url || "";
  const imageSrc = scene.imageUrl || "";

  return (
    <AbsoluteFill style={{ backgroundColor: "#000", opacity }}>
      {/* Use Img instead of Video — much less memory */}
      {videoSrc && (
        <Img
          src={`${videoSrc}?format=jpg`}  // fal.media supports this
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
      {!videoSrc && imageSrc && (
        <Img
          src={imageSrc}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
    </AbsoluteFill>
  );
};
// ─── Caption component ────────────────────────────────────────────────────────

const CaptionLayer: React.FC<{
  captions: Caption[];
  defaultStyle: SkeletonExportProps["defaultCaptionStyle"];
}> = ({ captions, defaultStyle }) => {
  const frame = useCurrentFrame();

  const active = captions.find(
    (c) => frame >= c.startFrame && frame <= c.endFrame
  );

  if (!active) return null;

  const merged = { ...defaultStyle, ...(active.style ?? {}) };

  const position = merged.position ?? "bottom";
  const verticalStyle: React.CSSProperties =
    position === "top"
      ? { top: 80, bottom: undefined }
      : position === "center"
        ? { top: "50%", transform: "translateY(-50%)" }
        : { bottom: 120, top: undefined };

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: "10%",
          right: "10%",
          ...verticalStyle,
          textAlign: (merged.textAlign as React.CSSProperties["textAlign"]) ?? "center",
          fontFamily: merged.fontFamily ?? "sans-serif",
          fontSize: merged.fontSize ?? 36,
          fontWeight: (merged.fontWeight as React.CSSProperties["fontWeight"]) ?? 700,
          color: merged.color ?? "#ffffff",
          backgroundColor: merged.backgroundColor ?? "rgba(0,0,0,0.5)",
          padding: "12px 20px",
          borderRadius: 8,
        }}
      >
        {active.text}
      </div>
    </AbsoluteFill>
  );
};

// ─── Main composition ─────────────────────────────────────────────────────────

export const SkeletonExport: React.FC<Record<string, unknown>> = (props) => {
  const {
    scenes,
    voiceoverUrl,
    musicUrl,
    musicVolume,
    captions,
    defaultCaptionStyle,
  } = props as unknown as SkeletonExportProps;
  const { durationInFrames } = useVideoConfig();

  // Build scene offsets
  let offset = 0;
  const sceneOffsets = scenes.map((scene) => {
    const start = offset;
    offset += scene.durationInFrames;
    return { scene, start };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* ── Scenes ───────────────────────────────────────────────────── */}
      {sceneOffsets.map(({ scene, start }, i) => (
        <Sequence
          key={scene.id ?? i}
          from={start}
          durationInFrames={scene.durationInFrames}
        >
          <SceneItem scene={scene} durationInFrames={scene.durationInFrames} />
        </Sequence>
      ))}

      {/* ── Captions ─────────────────────────────────────────────────── */}
      {captions.length > 0 && (
        <CaptionLayer captions={captions} defaultStyle={defaultCaptionStyle} />
      )}

      {/* ── Voiceover ────────────────────────────────────────────────── */}
      {voiceoverUrl && (
        <Audio src={voiceoverUrl} volume={1} />
      )}

      {/* ── Background music ──────────────────────────────────────────── */}
      {musicUrl && (
        <Audio
          src={musicUrl}
          volume={musicVolume}
          // Loop music for the full duration
          endAt={durationInFrames}
        />
      )}
    </AbsoluteFill>
  );
};
