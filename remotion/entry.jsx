const { registerRoot } = require("remotion");
const { MyVideo } = require("./MyVideo");

const Root = () => <MyVideo title="Demo Video" />;

registerRoot(Root);