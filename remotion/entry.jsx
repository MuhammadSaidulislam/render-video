import { registerRoot } from "remotion";
import { MyVideo } from "./index.jsx";

const VideoWrapper = () => <MyVideo title="Default Title" />;

registerRoot(VideoWrapper);