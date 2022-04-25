import { Canvas } from "@react-three/fiber";
import Title from "./Texts/Title";
import BPMSelectors from "./Texts/BPMSelectors";
import Ball from "./Ball";

function Scene() {
  return (
    <Canvas
      shadows
      camera={{
        far: 800,
        near: 1,
        fov: 45,
        position: [0, 0, 800],
        aspect: window.innerWidth / window.innerHeight,
      }}
    >
      <directionalLight position={[-10, 0, 500]} intensity={1} />
      <directionalLight position={[10, 0, 500]} intensity={1} />
      <Title />
      <BPMSelectors />
      <Ball />
    </Canvas>
  );
}

export default Scene;
