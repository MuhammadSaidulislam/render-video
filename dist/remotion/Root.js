"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Root = void 0;
const react_1 = __importDefault(require("react"));
const remotion_1 = require("remotion");
const SkeletonExport_1 = require("./compositions/SkeletonExport");
const DEFAULT_FPS = 30;
const DEFAULT_WIDTH = 1080;
const DEFAULT_HEIGHT = 1920;
// Fallback duration used in Remotion Studio preview only.
// The real duration is computed from scenes at render time in renderer.ts.
const PREVIEW_DURATION = 150;
const Root = () => {
    return (react_1.default.createElement(remotion_1.Composition, { id: "SkeletonExport", component: SkeletonExport_1.SkeletonExport, durationInFrames: PREVIEW_DURATION, fps: DEFAULT_FPS, width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT, defaultProps: {
            scenes: [],
            voiceoverUrl: "",
            musicUrl: "",
            musicVolume: 0.3,
            captions: [],
            defaultCaptionStyle: {},
        } }));
};
exports.Root = Root;
//# sourceMappingURL=Root.js.map