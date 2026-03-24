import { registerRoot } from "remotion";
import { MyVideo } from "./MyVideo";

const VideoWrapper = () => <MyVideo title="Default Title" />;
registerRoot(VideoWrapper);