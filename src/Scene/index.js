import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { DoubleSide } from "three";
import SimplexNoise from "simplex-noise";
import noiseShader from "./noiseShader";

function Sphere() {
  const sphere = useRef();
  const geometry = useRef();
  const noise = new SimplexNoise();

  useEffect(() => {
    console.log("GEOMETRY", geometry.current);
  }, [geometry.current]);

  useFrame(() => {
    if (sphere.current && geometry.current) {
      sphere.current.rotation.y += 0.005;
    }
  });

  let materialShader = useRef(null).current;

  return (
    <mesh ref={sphere}>
      <icosahedronBufferGeometry
        ref={geometry}
        attach="geometry"
        args={[100, 100]}
      />
      <meshStandardMaterial
        side={DoubleSide}
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
              value: 80.0,
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
        far: 500,
        near: 1,
        fov: 45,
        position: [0, 0, 450],
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
