import {
  EuiFlexGrid,
  EuiFlexGroup,
  EuiFlexItem,
  htmlIdGenerator,
} from "@elastic/eui";
import React, { useState } from "react";
import { ColorOption, ColorPickerContainer } from "./highlight-control.styles";

export enum HIGHLIGHT_COLORS {
  DEFAULT = "default",
  EXCITED = "excited",
  ANGRY = "angry",
  EMBARRASSED = "embarrassed",
  PAIN = "pain",
  GOAL = "goal",
  WORKAROUND = "workaround",
  CONTEXT = "context",
  MONEY = "money",
  MIXED = "mixed",
}

export const HIGHLIGHT_TYPES: {
  [key in HIGHLIGHT_COLORS]: { color: string; label: string };
} = {
  [HIGHLIGHT_COLORS.DEFAULT]: {
    color: "#cbf0f8",
    label: "Default",
  },
  [HIGHLIGHT_COLORS.EXCITED]: {
    color: "#fbbc04",
    label: "😁 Excited",
  },
  [HIGHLIGHT_COLORS.ANGRY]: {
    color: "#f28b82",
    label: "😡 Angry",
  },
  [HIGHLIGHT_COLORS.EMBARRASSED]: {
    label: "😳 Embarrassed",
    color: "#fdcfe8",
  },
  [HIGHLIGHT_COLORS.PAIN]: {
    color: "#fff475",
    label: "☇ Pain",
  },
  [HIGHLIGHT_COLORS.GOAL]: {
    color: "#ccff90",
    label: "🥅 Goal or job-to-be-done",
  },
  [HIGHLIGHT_COLORS.WORKAROUND]: {
    color: "#d7aefb",
    label: "⤴ Workaround",
  },
  [HIGHLIGHT_COLORS.CONTEXT]: {
    color: "#aecbfa",
    label: "^ Background",
  },
  [HIGHLIGHT_COLORS.MONEY]: {
    color: "#178117",
    label: "＄ Money",
  },
  [HIGHLIGHT_COLORS.MIXED]: {
    color: "#feefc3",
    label: "Mixed",
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
              color={HIGHLIGHT_TYPES[highlight as HIGHLIGHT_COLORS].color}
            />
          </EuiFlexItem>
        ))}
      </EuiFlexGrid>
    </ColorPickerContainer>
  );
};
