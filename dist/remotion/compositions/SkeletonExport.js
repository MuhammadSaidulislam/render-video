"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkeletonExport = void 0;
const react_1 = __importDefault(require("react"));
const remotion_1 = require("remotion");
// ─── Scene component ──────────────────────────────────────────────────────────
const SceneItem = ({ scene, durationInFrames, }) => {
    const frame = (0, remotion_1.useCurrentFrame)();
    // Fade in over 10 frames
    const opacity = (0, remotion_1.interpolate)(frame, [0, 10], [0, 1], {
        extrapolateRight: "clamp",
        easing: remotion_1.Easing.ease,
    });
    const containerStyle = {
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        opacity,
        ...scene.style,
    };
    return (react_1.default.createElement(remotion_1.AbsoluteFill, { style: containerStyle },
        scene.imageUrl && (react_1.default.createElement(remotion_1.Img, { src: scene.imageUrl, style: {
                width: "100%",
                height: "100%",
                objectFit: "cover",
            } })),
        scene.videoUrl && (react_1.default.createElement(remotion_1.Video, { src: scene.videoUrl, style: {
                width: "100%",
                height: "100%",
                objectFit: "cover",
            } })),
        scene.text && (react_1.default.createElement(remotion_1.AbsoluteFill, { style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px",
            } },
            react_1.default.createElement("p", { style: {
                    color: "#fff",
                    fontSize: 48,
                    fontWeight: 700,
                    textAlign: "center",
                    textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                    fontFamily: "sans-serif",
                    margin: 0,
                } }, scene.text)))));
};
// ─── Caption component ────────────────────────────────────────────────────────
const CaptionLayer = ({ captions, defaultStyle }) => {
    const frame = (0, remotion_1.useCurrentFrame)();
    const active = captions.find((c) => frame >= c.startFrame && frame <= c.endFrame);
    if (!active)
        return null;
    const merged = { ...defaultStyle, ...(active.style ?? {}) };
    const position = merged.position ?? "bottom";
    const verticalStyle = position === "top"
        ? { top: 80, bottom: undefined }
        : position === "center"
            ? { top: "50%", transform: "translateY(-50%)" }
            : { bottom: 120, top: undefined };
    return (react_1.default.createElement(remotion_1.AbsoluteFill, null,
        react_1.default.createElement("div", { style: {
                position: "absolute",
                left: "10%",
                right: "10%",
                ...verticalStyle,
                textAlign: merged.textAlign ?? "center",
                fontFamily: merged.fontFamily ?? "sans-serif",
                fontSize: merged.fontSize ?? 36,
                fontWeight: merged.fontWeight ?? 700,
                color: merged.color ?? "#ffffff",
                backgroundColor: merged.backgroundColor ?? "rgba(0,0,0,0.5)",
                padding: "12px 20px",
                borderRadius: 8,
            } }, active.text)));
};
// ─── Main composition ─────────────────────────────────────────────────────────
const SkeletonExport = (props) => {
    const { scenes, voiceoverUrl, musicUrl, musicVolume, captions, defaultCaptionStyle, } = props;
    const { durationInFrames } = (0, remotion_1.useVideoConfig)();
    // Build scene offsets
    let offset = 0;
    const sceneOffsets = scenes.map((scene) => {
        const start = offset;
        offset += scene.durationInFrames;
        return { scene, start };
    });
    return (react_1.default.createElement(remotion_1.AbsoluteFill, { style: { backgroundColor: "#000" } },
        sceneOffsets.map(({ scene, start }, i) => (react_1.default.createElement(remotion_1.Sequence, { key: scene.id ?? i, from: start, durationInFrames: scene.durationInFrames },
            react_1.default.createElement(SceneItem, { scene: scene, durationInFrames: scene.durationInFrames })))),
        captions.length > 0 && (react_1.default.createElement(CaptionLayer, { captions: captions, defaultStyle: defaultCaptionStyle })),
        voiceoverUrl && (react_1.default.createElement(remotion_1.Audio, { src: voiceoverUrl, volume: 1 })),
        musicUrl && (react_1.default.createElement(remotion_1.Audio, { src: musicUrl, volume: musicVolume, 
            // Loop music for the full duration
            endAt: durationInFrames }))));
};
exports.SkeletonExport = SkeletonExport;
//# sourceMappingURL=SkeletonExport.js.map