// remotion/entry.tsx
import { registerRoot } from "remotion";
import { MyVideo } from "./index";

// ✅ wrap in component with no required props
const VideoWrapper: React.FC = () => {
  return <MyVideo title="Default Title" />;
};

registerRoot(VideoWrapper);