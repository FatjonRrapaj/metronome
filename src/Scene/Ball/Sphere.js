import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import anime from "animejs/lib/anime.es.js";

import { BPMContext } from "../../context";
import noiseShader from "./noiseShader";

function Sphere({ wireframe, color = "#ff00ff", maxScale = 0.3 }) {
  const bpm = 72;
  const sphere = useRef();
  const geometry = useRef();

  let materialShader = useRef(null).current;
  let scaleFactor = useRef({ value: 0.2 }).current;
  let noiseFactor = useRef({
    value: 0,
  }).current;

  const increase = anime({
    targets: noiseFactor,
    value: bpm * 2,
    duration: (60 / bpm) * 1000,
    direction: "alternate",
    loop: true,
    autoplay: false,
    easing: "easeInOutSine",
  });
  const zoom = anime({
    targets: scaleFactor,
    value: maxScale,
    duration: (60 / bpm) * 1000,
    direction: "alternate",
    loop: true,
    autoplay: false,
    easing: "easeInOutSine",
  });

  //   let counter = useRef(0).current;
  useEffect(() => {
    increase.play();
    zoom.play();
    //non animated, more 'manual' version:
    // const interval = setInterval(() => {
    //   noiseFactor.value = counter % 2 === 0 ? bpm * 2 : 0;
    //   scaleFactor.value =  counter % 2 === 0 ? 0.3 : 0.2
    //   counter++;
    // }, (60 / bpm) * 1000);

    // return () => clearInterval(interval);
  }, [geometry.current]);

  useFrame(() => {
    if (sphere.current && geometry.current) {
      sphere.current.rotation.y += 0.005;
      sphere.current.rotation.x += 0.005;
      sphere.current.rotation.z += 0.005;

      sphere.current.scale.set(
        scaleFactor.value,
        scaleFactor.value,
        scaleFactor.value
      );
    }
    if (materialShader) {
      materialShader.uniforms.uNoiseFactor.value = noiseFactor.value;
    }
  });

  return (
    <mesh ref={sphere} scale={[0.2, 0.2, 0.2]}>
      <icosahedronBufferGeometry
        ref={geometry}
        attach="geometry"
        args={[500, 30]}
      />
      <meshStandardMaterial
        color={color}
        wireframe={wireframe}
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
              value: 0.0,
            },
            uPosotionNoiseFactor: {
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
export default Sphere;
