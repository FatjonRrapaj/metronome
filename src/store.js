import create from "zustand";

const useStore = create((set) => ({
  bpm: 72,
  setBpm: (value) => set(() => ({ bpm: value })),
  songs: {},
  setSongs: (value) => set(() => ({ songs: value })),
  emissiveIntensity: 1,
  color: "#ff00ff",
  wireframeColor: "#0000ff",
  setColor: (value) => set(() => ({ color: value })),
  setWireframeColor: (value) => set(() => ({ wireframeColor: value })),
  setEmissiveIntensity: (value) => set(() => ({ emissiveIntensity: value })),
}));

export default useStore;
