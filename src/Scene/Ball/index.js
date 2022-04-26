import { useEffect, useState } from "react";

import Sphere from "./Sphere";
import useStore from "../../store";
import click from "../../assets/sounds/click.wav";

function Ball() {
  const { bpm, color, wireframeColor, emissiveIntensity } = useStore(
    (state) => state
  );

  const [clickSound] = useState(() => new Audio(click));

  useEffect(() => {
    const interval = setInterval(() => {
      clickSound.play();
    }, (60 / bpm) * 1000);

    return () => clearInterval(interval);
  }, [bpm]);

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
