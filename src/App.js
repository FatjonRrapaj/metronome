import { useEffect } from "react";

import useStore from "./store";
import Scene from "./Scene";
import Songs from "./Songs";

function App() {
  const { setAudioEnabled, audioEnabled } = useStore((state) => state);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: "2%",
      }}
    >
      <Scene />
      <Songs />
      <div
        onClick={() => setAudioEnabled()}
        style={{
          position: "absolute",
          bottom: "2%",
          right: "2%",
          color: "white",
        }}
      >
        {audioEnabled ? "SOUND ON" : "SOUND OFF"}
      </div>
    </div>
  );
}

export default App;
