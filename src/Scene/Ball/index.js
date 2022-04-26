import { useEffect, useState } from "react";

import Sphere from "./Sphere";
import useStore from "../../store";
import click from "../../assets/sounds/click.wav";

function Ball() {
  const { bpm, audioEnabled, color, wireframeColor, emissiveIntensity } =
    useStore((state) => state);

  const [clickSound] = useState(() => {
    const audio = new Audio(click);
    return audio;
  });

  useEffect(() => {
    let interval;
    if (!audioEnabled) return;
    interval = setInterval(() => {
      clickSound.play();
    }, (60 / bpm) * 1000);

    return () => {
      interval && clearInterval(interval);
    };
  }, [bpm, audioEnabled]);

  return (
    <group>
      <Sphere
        wireframe={false}
        color={color}
        emissiveIntensity={emissiveIntensity}
      />
      <Sphere
        wireframe={true}
        maxScale={0.4}
        color={wireframeColor}
        emissiveIntensity={emissiveIntensity}
      />
    </group>
  );
}

export default Ball;
