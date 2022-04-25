import Sphere from "./Sphere";

function Ball() {
  return (
    <group>
      <Sphere wireframe={false} />
      <Sphere wireframe={true} color={"#fff"} />
    </group>
  );
}

export default Ball;
