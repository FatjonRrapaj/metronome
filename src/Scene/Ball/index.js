import Sphere from "./Sphere";

function Ball() {
  return (
    <group>
      <Sphere wireframe={false} />
      <Sphere wireframe={true} color={"#0000ff"} maxScale={0.4} />
    </group>
  );
}

export default Ball;
