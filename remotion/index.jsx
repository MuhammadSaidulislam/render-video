import { AbsoluteFill, useCurrentFrame } from "remotion";

export const MyVideo = ({ title }) => {
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