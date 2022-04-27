import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import anime from "animejs/lib/anime.es.js";

import useStore from "../../store";
import noiseShader from "./noiseShader";

function Sphere({
  wireframe,
  color = "#ff00ff",
  maxScale = 0.3,
  emissiveIntensity,
}) {
  const bpm = useStore((state) => state.bpm);
  const sphere = useRef();
  const geometry = useRef();

  let materialShader = useRef({ value: null }).current;
  let transformSphere = useRef({ scale: 0.2, noise: 0 }).current;

  useEffect(() => {
    if (!materialShader) return;
    const transformAnim = anime({
      targets: transformSphere,
      noise: bpm * 4,
      scale: maxScale,
      duration: (60 / bpm / 2) * 1000,
      direction: "alternate",
      loop: true,
      autoplay: false,
      easing: "easeInOutCubic",
    });
    transformAnim.play();

    return () => {
      transformAnim.pause();
      transformAnim.seek(0);
      transformSphere.scale = 0.2;
      transformSphere.noise = 0;
    };
  }, [bpm, materialShader]);

  useFrame(() => {
    if (sphere.current && geometry.current) {
      sphere.current.rotation.y += 0.005;
      sphere.current.rotation.x += 0.005;
      sphere.current.rotation.z += 0.005;

      sphere.current.scale.set(
        transformSphere.scale,
        transformSphere.scale,
        transformSphere.scale
      );
    }
    if (materialShader.value) {
      materialShader.value.uniforms.uNoiseFactor.value = transformSphere.noise;
    }
  }, 0);

  function onBeforeCompile(shader) {
    shader.vertexShader = shader.vertexShader.replace(
      "#include <uv_pars_vertex>",
      noiseShader
    );
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
    shader.vertexShader = shader.vertexShader.replace(
      "#include <worldpos_vertex>",
      `vUv = uv;
                noise = uNoiseFactor * turbulence(normal);
                float b = uPosotionNoiseFactor * pnoise(0.01 * position, vec3(100.0));
                float displacement = noise + b;
                vec3 newPosition = position + normal * displacement;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);`
    );
    materialShader.value = shader;
  }

  return (
    <mesh ref={sphere} scale={[0.2, 0.2, 0.2]}>
      <icosahedronBufferGeometry
        ref={geometry}
        attach="geometry"
        args={[500, 20]}
      />
      <meshStandardMaterial
        color={color}
        wireframe={wireframe}
        emissive={color}
        emissiveIntensity={emissiveIntensity}
        onBeforeCompile={(shader) => {
          onBeforeCompile(shader);
        }}
      />
    </mesh>
  );
}
export default Sphere;
