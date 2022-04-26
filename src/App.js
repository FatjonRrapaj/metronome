import Scene from "./Scene";
import Songs from "./Songs";

function App() {
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
    </div>
  );
}

export default App;
