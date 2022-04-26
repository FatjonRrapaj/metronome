import useStore from "../store";
import songsList from "./bpm.json";
console.log("songsList: ", songsList);

function Songs() {
  return (
    <div style={{ backgroundColor: "red" }}>
      <div style={{ color: "red" }}>Songs that use this BPM</div>
      <div style={{ color: "red" }}>Songs that use this BPM</div>
      <div style={{ color: "red" }}>Songs that use this BPM</div>
    </div>
  );
}

export default Songs;
