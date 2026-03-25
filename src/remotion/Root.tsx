import React from "react";
import { Composition } from "remotion";
import { SkeletonExport } from "./compositions/SkeletonExport";
import type { Scene, Caption, CaptionStyle } from "../types";

export interface SkeletonExportProps {
  scenes: Scene[];
  voiceoverUrl: string;
  musicUrl: string;
  musicVolume: number;
  captions: Caption[];
  defaultCaptionStyle: CaptionStyle;
}

const DEFAULT_FPS = 30;
const DEFAULT_WIDTH = 1080;
const DEFAULT_HEIGHT = 1920;

// Fallback duration used in Remotion Studio preview only.
// The real duration is computed from scenes at render time in renderer.ts.
const PREVIEW_DURATION = 150;

export const Root: React.FC = () => {
  return (
    <Composition
      id="SkeletonExport"
      component={SkeletonExport}
      durationInFrames={PREVIEW_DURATION}
      fps={DEFAULT_FPS}
      width={DEFAULT_WIDTH}
      height={DEFAULT_HEIGHT}
      defaultProps={{
        scenes: [],
        voiceoverUrl: "",
        musicUrl: "",
        musicVolume: 0.3,
        captions: [],
        defaultCaptionStyle: {},
      }}
    />
  );
};
