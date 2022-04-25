import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { DoubleSide } from "three";

function Sphere() {
  const sphere = useRef();

  useFrame(() => {
    if (sphere.current) {
      sphere.current.rotation.y += 0.2;
    }
  });

  return (
    <mesh ref={sphere}>
      <icosahedronBufferGeometry attach="geometry" args={[2, 10]} />
      <meshBasicMaterial side={DoubleSide} color="#ff00ff" wireframe={true} />
    </mesh>
  );
}

function Scene() {
  return (
    <Canvas
      shadows
      camera={{
        far: 200,
        near: 1,
        fov: 45,
        position: [0, 0, 10],
        aspect: window.innerWidth / window.innerHeight,
      }}
      antialias
    >
      <directionalLight intensity={0.5} />
      <Sphere />
    </Canvas>
  );
}

export default Scene;
