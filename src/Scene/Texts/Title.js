import Text from "./Text";

function Title() {
  return (
    <group>
      <Text
        size={0.8}
        position={[0, 30, 700]}
        rotation={[Math.PI / 16, 0, 0]}
        children="DIGITAL"
      />
      <Text
        size={0.8}
        position={[0, 26, 700]}
        rotation={[Math.PI / 16, 0, 0]}
        children="3D"
      />
      <Text
        size={0.8}
        position={[0, 22, 700]}
        rotation={[Math.PI / 16, 0, 0]}
        children="METRONOME"
      />
    </group>
  );
}

export default Title;
