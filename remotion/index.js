// remotion/index.jsx
import React from "react";
import { Composition } from "remotion";

// No TypeScript types here
export const MyVideo = ({ title = "Default Title" }) => {
  return (
    <div style={{ flex: 1, backgroundColor: "black", color: "white" }}>
      <h1>{title}</h1>
    </div>
  );
};

export const compositions = [
  (
    <Composition
      id="MyVideo"
      component={MyVideo}
      durationInFrames={240}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{ title: "Hello Railway" }}
    />
  ),
];