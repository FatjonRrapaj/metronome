import create from "zustand";

const useStore = create((set) => ({
  bpm: 72,
  emissiveIntensity: 1,
  color: "#ff00ff",
  wireframeColor: "#0000ff",
  setBpm: (value) => set(() => ({ bpm: value })),
  setColor: (value) => set(() => ({ color: value })),
  setWireframeColor: (value) => set(() => ({ wireframeColor: value })),
  setEmissiveIntensity: (value) => set(() => ({ emissiveIntensity: value })),
}));

export default useStore;
