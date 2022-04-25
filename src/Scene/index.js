import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Text from "./Text";
import noiseShader from "./noiseShader";

function Sphere() {
  const sphere = useRef();
  const geometry = useRef();

  const [bpm, setBpm] = useState(115);
  let materialShader = useRef(null).current;
  let scaleFactor = useRef(0.2).current;
  let noiseFactor = useRef(0).current;
  let counter = useRef(0).current;

  useEffect(() => {
    let interval = setInterval(() => {
      noiseFactor = counter % 2 === 0 ? 0 : bpm * 2;
      scaleFactor = counter % 2 === 0 ? 0.2 : 0.25;
      counter++;
    }, (60 / bpm) * 1000);

    return () => clearInterval(interval);
  }, [geometry.current]);

  useFrame((state) => {
    if (sphere.current && geometry.current) {
      sphere.current.rotation.y += 0.005;
      sphere.current.rotation.x -= 0.005;

      sphere.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
    }

    if (materialShader) {
      materialShader.uniforms.uNoiseFactor.value = noiseFactor;
    }
  });

  return (
    <mesh
      onClick={() => console.log("CLICKED")}
      ref={sphere}
      scale={[0.2, 0.2, 0.2]}
    >
      <icosahedronBufferGeometry
        ref={geometry}
        attach="geometry"
        args={[500, 20]}
      />
      <meshStandardMaterial
        color="#ff00ff"
        wireframe={true}
        onBeforeCompile={(shader) => {
          // The perlin noise code goes here, above the main() function in the shader.
          // Noise shader from https://github.com/ashima/webgl-noise.
          shader.vertexShader = shader.vertexShader.replace(
            "#include <uv_pars_vertex>",
            noiseShader
          );
          /**
           * Adding controls to existing glsl.
           */
          shader.uniforms = {
            ...shader.uniforms,
            uNoiseFactor: {
              //80.0
              value: 0.0,
            },
            uPosotionNoiseFactor: {
              //5.0
              value: 0,
            },
          };
          shader.vertexShader =
            "uniform float uNoiseFactor;\n" +
            "uniform float uPosotionNoiseFactor;\n" +
            shader.vertexShader;
          // The vertex shader code that goes inside main() needs to be separate from the perlin noise code.
          shader.vertexShader = shader.vertexShader.replace(
            "#include <worldpos_vertex>",
            `vUv = uv;
                    noise = uNoiseFactor * turbulence(normal);
                    float b = uPosotionNoiseFactor * pnoise(0.01 * position, vec3(100.0));
                    float displacement = noise + b;
                    vec3 newPosition = position + normal * displacement;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);`
          );
          materialShader = shader;
        }}
      />
    </mesh>
  );
}

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
      <Text size={0.5} position={[-10, -20, 700]} children="72" />
      <Text size={0.5} position={[0, -20, 700]} children="74" />
      <Text size={0.5} position={[10, -20, 700]} children="82" />

      <group>
        <Text
          size={0.8}
          position={[0, 30, 700]}
          rotation={[Math.PI / 16, 0, 0]}
          children="DIGITAL"
        />
        <Text
          size={0.8}
          position={[0, 26, 700]}
          rotation={[Math.PI / 16, 0, 0]}
          children="3D"
        />
        <Text
          size={0.8}
          position={[0, 22, 700]}
          rotation={[Math.PI / 16, 0, 0]}
          children="METRONOME"
        />
      </group>

      <Text
        size={0.5}
        position={[-10, -30, 700]}
        rotation={[-Math.PI / 16, 0, 0]}
        children="84"
      />
      <Text
        size={0.5}
        position={[0, -30, 700]}
        rotation={[-Math.PI / 16, 0, 0]}
        children="128"
      />
      <Text
        size={0.5}
        position={[10, -30, 700]}
        rotation={[-Math.PI / 16, 0, 0]}
        children="138"
      />
      <Sphere />
    </Canvas>
  );
}

export default Scene;
