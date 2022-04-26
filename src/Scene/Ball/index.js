import Sphere from "./Sphere";
import useStore from "../../store";

function Ball() {
  const { color, wireframeColor, emissiveIntensity } = useStore(
    (state) => state
  );
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
