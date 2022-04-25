import Sphere from "./Sphere";

function Ball() {
  return (
    <group>
      <Sphere wireframe={true} />
      <Sphere wireframe={false} />
    </group>
  );
}

export default Ball;
