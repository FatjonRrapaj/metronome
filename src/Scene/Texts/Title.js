import Text from "./Text";

function Title() {
  return (
    <group>
      <Text
        size={0.8}
        position={[0, 30, 700]}
        rotation={[Math.PI / 16, 0, 0]}
        children="FUNKY"
      />
      <Text
        size={0.8}
        position={[0, 26, 700]}
        rotation={[Math.PI / 16, 0, 0]}
        children="3D"
      />
      <Text
        size={0.8}
        position={[-6, 22, 700]}
        rotation={[Math.PI / 16, 0, 0]}
        children="METRO"
      />
      <Text
        size={0.8}
        position={[8, 22, 700]}
        rotation={[Math.PI / 16, 0, 0]}
        children="NOME"
      />
    </group>
  );
}

export default Title;
