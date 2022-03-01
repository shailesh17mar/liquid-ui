import { EuiFlexGrid } from "@elastic/eui";
import styled from "styled-components";

interface ColorOptionProps {
  color: string;
  isSelected: boolean;
}
export const ColorOption = styled.div<ColorOptionProps>`
  cursor: pointer;
  background: ${(props) => props.color};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: ${(props) => props.isSelected && "solid 2px black"};
`;

export const ColorPickerContainer = styled.div`
  max-width: 200px;
  margin: 0 auto;
`;
