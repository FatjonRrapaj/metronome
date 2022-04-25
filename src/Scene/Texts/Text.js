import { Vector3 } from "three";
import React, {
  useMemo,
  useRef,
  useLayoutEffect,
  useState,
  useEffect,
} from "react";
import { extend, useLoader, useFrame } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import boldUrl from "../../assets/fonts/bold.blob";
import anime from "animejs/lib/anime.es.js";

export default function Text({
  children,
  vAlign = "center",
  hAlign = "center",
  size = 1.5,
  color = "#000000",
  selected,
  onClick,
  ...props
}) {
  extend({ TextGeometry });

  const [hovered, setHovered] = useState(false);
  const mesh = useRef();
  const group = useRef();

  useEffect(() => {
    if (!onClick) return;
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => (document.body.style.cursor = "auto");
  }, [hovered]);

  useEffect(() => {
    if (!group.current) {
      return;
    }

    anime({
      targets: group.current.rotation,
      z: Math.PI * 2,
      duration: 1500,
      delay: 500,
      autoplay: true,
    });
  }, [group.current]);

  const font = useLoader(FontLoader, boldUrl);

  const config = useMemo(
    () => ({
      font,
      size: 40,
      height: 4,
      curveSegments: 32,
      bevelEnabled: true,
      bevelThickness: 2,
      bevelSize: 2.5,
      bevelOffset: 0,
      bevelSegments: 8,
    }),
    [font]
  );

  useFrame(({ clock }) => {
    if (selected && !!group.current) {
      group.current.rotation.y = Math.sin(clock.getElapsedTime());
    }
  });

  useLayoutEffect(() => {
    const size = new Vector3();
    mesh.current.geometry.computeBoundingBox();
    mesh.current.geometry.boundingBox.getSize(size);
    mesh.current.position.x =
      hAlign === "center" ? -size.x / 2 : hAlign === "right" ? 0 : -size.x;
    mesh.current.position.y =
      vAlign === "center" ? -size.y / 2 : vAlign === "top" ? 0 : -size.y;
  }, [children]);

  return (
    <group
      ref={group}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClick && onClick()}
      {...props}
      scale={[0.1 * size, 0.1 * size, 0.1]}
    >
      <mesh ref={mesh}>
        <textGeometry args={[children, config]} />
        <meshNormalMaterial />
      </mesh>
    </group>
  );
}
