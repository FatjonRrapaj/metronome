import create from "zustand";

const useStore = create((set) => ({
  bpm: 72,
  setBpm: (value) => set(() => ({ bpm: value })),
  songs: {},
  audioEnabled: false,
  setAudioEnabled: () =>
    set((state) => ({ audioEnabled: !state.audioEnabled })),
  setSongs: (value) => set(() => ({ songs: value })),
  emissiveIntensity: 1,
  setEmissiveIntensity: (value) => set(() => ({ emissiveIntensity: value })),
  color: "#ff00ff",
  setColor: (value) => set(() => ({ color: value })),
  wireframeColor: "#0000ff",
  setWireframeColor: (value) => set(() => ({ wireframeColor: value })),
}));

export default useStore;
