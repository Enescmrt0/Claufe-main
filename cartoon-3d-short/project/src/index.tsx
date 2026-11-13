import React from "react";
import { Composition, registerRoot } from "remotion";
import { BridgeShort, BRIDGE_FRAMES } from "./videos/bridge/Bridge";

// Register every new short next to BridgeShort (copy src/videos/bridge to src/videos/<name> first).
const Root: React.FC = () => (
  <>
    <Composition id="BridgeShort" component={BridgeShort} durationInFrames={BRIDGE_FRAMES} fps={30} width={1080} height={1920} />
  </>
);
registerRoot(Root);
