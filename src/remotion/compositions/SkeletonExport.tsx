import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  Img,
  OffthreadVideo,
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
      {videoSrc && (
        <OffthreadVideo
          src={videoSrc}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
      {!videoSrc && imageSrc && (
        <Img
          src={imageSrc}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
      {scene.text && (
        <AbsoluteFill style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
        }}>
          <p style={{
            color: "#fff",
            fontSize: 48,
            fontWeight: 700,
            textAlign: "center",
            textShadow: "0 2px 8px rgba(0,0,0,0.8)",
            fontFamily: "sans-serif",
            margin: 0,
          }}>
            {scene.text}
          </p>
        </AbsoluteFill>
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

  const posX = (defaultStyle as any).posX ?? 50; // percentage 0-100
  const posY = (defaultStyle as any).posY ?? 50; // percentage 0-100

  const strokeWidth = (defaultStyle as any).strokeWidth ?? 0;
  const strokeColor = (defaultStyle as any).strokeColor ?? "transparent";
  const shadowX = (defaultStyle as any).shadowX ?? 0;
  const shadowY = (defaultStyle as any).shadowY ?? 0;
  const shadowBlur = (defaultStyle as any).shadowBlur ?? 0;
  const shadowColor = (defaultStyle as any).shadowColor ?? "transparent";
  const bold = (defaultStyle as any).bold ?? false;

  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: `${posX}%`,
          top: `${posY}%`,
          transform: "translate(-50%, -50%)", // center on the point
          width: "80%",
          textAlign: "center",
          fontFamily: defaultStyle.fontFamily ?? "sans-serif",
          fontSize: defaultStyle.fontSize ?? 36,
          fontWeight: bold ? 700 : 400,
          color: defaultStyle.color ?? "#ffffff",
          // Text stroke via webkit
          WebkitTextStroke: strokeWidth ? `${strokeWidth}px ${strokeColor}` : undefined,
          // Text shadow
          textShadow: shadowBlur || shadowX || shadowY
            ? `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor}`
            : undefined,
          padding: "8px 16px",
          borderRadius: 6,
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
