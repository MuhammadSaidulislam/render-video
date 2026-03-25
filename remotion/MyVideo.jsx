const { AbsoluteFill, useCurrentFrame } = require("remotion");

const MyVideo = ({ title }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        fontSize: 60,
        backgroundColor: "black",
        color: "white",
      }}
    >
      {title} - Frame {frame}
    </AbsoluteFill>
  );
};

module.exports = { MyVideo };