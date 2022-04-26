import { useEffect } from "react";

import useStore from "../store";
import songsList from "./bpm.json";
import "./songs.css";

function Songs() {
  const { bpm, songs, setSongs } = useStore((state) => state);

  function formatSongs() {
    const formattedSongs = {};
    for (let song of songsList) {
      const title = song[0];
      const author = song[1];
      const bpmVal = song[2];
      if (!formattedSongs[bpmVal]) formattedSongs[bpmVal] = [];
      const formattedSong = `${title} (${author})`;
      formattedSongs[bpmVal] = [...formattedSongs[bpmVal], formattedSong];
    }
    return formattedSongs;
  }

  useEffect(() => {
    //setting formatted songs to store only onc
    const formattedSongs = formatSongs();
    setSongs(formattedSongs);
  }, []);

  function renderSongs() {
    if (!songs[bpm]) return null;
    return songs[bpm].map((song, index) => (
      <div key={`${song}_${index}`}>{song}</div>
    ));
  }

  if (!songs[bpm]) return null;

  return (
    <div className="songsContainer">
      <div className="songsTitle">Songs that use this BPM</div>
      {renderSongs()}
    </div>
  );
}

export default Songs;
