import { registerRoot } from "remotion";
import { MyVideo } from "./index.jsx";

const VideoWrapper = () => <MyVideo title="Test Video" />;

registerRoot(VideoWrapper);