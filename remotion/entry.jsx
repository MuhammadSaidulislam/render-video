import { registerRoot } from "remotion";
import { MyVideo } from "./MyVideo.jsx";

const VideoWrapper = () => <MyVideo title="Default Title" />;

registerRoot(VideoWrapper);