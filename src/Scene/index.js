import { Canvas } from "@react-three/fiber";
import Title from "./Texts/Title";
import BPMSelectors from "./Texts/BPMSelectors";

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
      <directionalLight position={[-10, 0, 500]} intensity={0.5} />
      <directionalLight position={[10, 0, 500]} intensity={0.5} />
      <Title />
      <BPMSelectors />
      <Sphere />
    </Canvas>
  );
}

export default Scene;
