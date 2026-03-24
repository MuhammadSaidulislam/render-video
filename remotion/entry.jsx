import { registerRoot } from "remotion";
import { MyVideo } from "./index.jsx";

// Wrapper (no TypeScript)
const VideoWrapper = () => {
  return <MyVideo title="Default Title" />;
};

registerRoot(VideoWrapper);