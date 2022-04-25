import Text from "./Text";

const bpmPreset = [
  {
    value: 72,
    position: [-10, -20, 700],
    rotation: [0, 0, 0],
  },
  {
    value: 74,
    position: [0, -20, 700],
    rotation: [0, 0, 0],
  },
  {
    value: 82,
    position: [10, -20, 700],
    rotation: [-Math.PI / 16, 0, 0],
  },
  {
    value: 84,
    position: [-10, -30, 700],
    rotation: [-Math.PI / 16, 0, 0],
  },
  {
    value: 128,
    position: [0, -30, 700],
    rotation: [-Math.PI / 16, 0, 0],
  },
  {
    value: 138,
    position: [10, -30, 700],
    rotation: [-Math.PI / 16, 0, 0],
  },
];

function BPMSelectors() {
  return (
    <group>
      {bpmPreset.map(({ value, position, rotation }, index) => (
        <Text
          key={`${value}_${index}`}
          size={0.5}
          position={position}
          rotation={rotation}
          children={`${value}`}
        />
      ))}
    </group>
  );
}

export default BPMSelectors;
