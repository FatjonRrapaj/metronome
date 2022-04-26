import useStore from "../../store";
import Text from "./Text";

const bpmPreset = [
  {
    value: 72,
    position: [-10, -20, 700],
    rotation: [0, 0, 0],
    emissiveIntensity: 1,
    color: "#ff00ff",
    wireframeColor: "#0000ff",
  },
  {
    value: 74,
    position: [0, -20, 700],
    rotation: [0, 0, 0],
    emissiveIntensity: 3,
    color: "#000fff",
    wireframeColor: "#fff",
  },
  {
    value: 82,
    position: [10, -20, 700],
    rotation: [-Math.PI / 16, 0, 0],
    emissiveIntensity: 1,
    color: "#00ff00",
    wireframeColor: "#ff0000",
  },
  {
    value: 84,
    position: [-10, -30, 700],
    rotation: [-Math.PI / 16, 0, 0],
    emissiveIntensity: 1,
    color: "#f000ff",
    wireframeColor: "#00ff00",
  },
  {
    value: 128,
    position: [0, -30, 700],
    rotation: [-Math.PI / 16, 0, 0],
    emissiveIntensity: 4,
    color: "#00ff00",
    wireframeColor: "#ff00ff",
  },
  {
    value: 138,
    position: [10, -30, 700],
    rotation: [-Math.PI / 16, 0, 0],
    emissiveIntensity: 1,
    color: "#00ffff",
    wireframeColor: "#ff0000",
  },
];

function BPMSelectors() {
  const { bpm, setBpm, setColor, setWireframeColor, setEmissiveIntensity } =
    useStore((state) => state);
  return (
    <group>
      {bpmPreset.map(
        (
          {
            value,
            position,
            rotation,
            color,
            wireframeColor,
            emissiveIntensity,
          },
          index
        ) => (
          <Text
            onClick={() => {
              console.log("CLICKED");
              setBpm(value);
              setColor(color);
              setWireframeColor(wireframeColor);
              setEmissiveIntensity(emissiveIntensity);
            }}
            selected={bpm === value}
            key={`${value}_${index}`}
            size={0.5}
            position={position}
            rotation={rotation}
            children={`${value}`}
          />
        )
      )}
    </group>
  );
}

export default BPMSelectors;
