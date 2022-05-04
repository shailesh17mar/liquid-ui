import { EuiButtonEmpty, EuiButtonProps } from "@elastic/eui";
import styled from "styled-components";

interface Props {
  colour?: string;
}
export const QuickActionButton = styled(EuiButtonEmpty)<Props>`
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  border-radius: 0.6rem;
  min-width: 100px;
  color: #000;
  font-weight: 500;
  svg {
    fill: ${(props) => props.colour || "#000"};
  }
`;
