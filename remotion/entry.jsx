import { registerRoot } from "remotion";
import { MyVideo } from "./MyVideo";

const VideoWrapper = () => <MyVideo title="Demo Video" />;

registerRoot(VideoWrapper);