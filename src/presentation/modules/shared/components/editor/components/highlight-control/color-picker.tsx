import {
  EuiFlexGrid,
  EuiFlexGroup,
  EuiFlexItem,
  htmlIdGenerator,
} from "@elastic/eui";
import React, { useState } from "react";
import { ColorOption, ColorPickerContainer } from "./highlight-control.styles";

export const HIGHLIGHT_TYPES: {
  [key: string]: { color: string; label: string };
} = {
  excited: {
    color: "#fbbc04",
    label: "😁 Excited",
  },
  angry: {
    color: "#f28b82",
    label: "😡 Angry",
  },
  embarrassed: {
    label: "😳 Embarrassed",
    color: "#fdcfe8",
  },
  pain: {
    color: "#fff475",
    label: "☇ Pain",
  },
  goal: {
    color: "#ccff90",
    label: "🥅 Goal or job-to-be-done",
  },
  workaround: {
    color: "#d7aefb",
    label: "⤴ Workaround",
  },
  context: {
    color: "#aecbfa",
    label: "^ Background",
  },
  money: {
    color: "#178117",
    label: "＄ Money",
  },
};
interface ColorPickerProps {
  onChange: (value: string) => void;
  selected?: string;
}
export const ColorPicker = ({ onChange, selected }: ColorPickerProps) => {
  const [id] = useState(htmlIdGenerator()());
  return (
    <ColorPickerContainer>
      <EuiFlexGrid gutterSize="s" columns={4}>
        {Object.keys(HIGHLIGHT_TYPES).map((highlight) => (
          <EuiFlexItem key={`${id}-${highlight}`}>
            <ColorOption
              isSelected={selected ? selected === highlight : false}
              onClick={() => onChange(highlight)}
              color={HIGHLIGHT_TYPES[highlight].color}
            />
          </EuiFlexItem>
        ))}
      </EuiFlexGrid>
    </ColorPickerContainer>
  );
};
