import useStore from "../store";
import Scene from "../Scene";
import Songs from "../Songs";
import "./app.css";

function App() {
  const { setAudioEnabled, audioEnabled } = useStore((state) => state);

  return (
    <div className="appContainer">
      <Scene />
      <Songs />
      <div className="soundButton" onClick={() => setAudioEnabled()}>
        {audioEnabled ? "SOUND ON" : "SOUND OFF"}
      </div>
    </div>
  );
}

export default App;
