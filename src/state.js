import create from "zustand";

const useStore = create((set) => ({
  bpm: 72,
  setBpm: (value) => set(() => ({ bpm: value })),
}));

export default useStore;
