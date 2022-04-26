import useStore from "../../store";
import Text from "./Text";
import bpmPreset from "./selectorsConfig";

function BPMSelectors() {
  const { bpm, setBpm, setColor, setWireframeColor, setEmissiveIntensity } =
    useStore((state) => state);

  return (
    <group>
      {bpmPreset.map((preset, index) => (
        <Text
          onClick={() => {
            setBpm(preset.value);
            setColor(preset.color);
            setWireframeColor(preset.wireframeColor);
            setEmissiveIntensity(preset.emissiveIntensity);
          }}
          selected={bpm === preset.value}
          key={`${preset.value}_${index}`}
          size={0.5}
          position={preset.position}
          rotation={preset.rotation}
          children={`${preset.value}`}
        />
      ))}
    </group>
  );
}

export default BPMSelectors;
