import styled from "styled-components";
import { HIGHLIGHT_TYPES } from "../shared/components/editor/components/highlight-control/highlight-control";

interface Props {
  type: string;
  top?: number;
}
export const TagAnnotation = styled.div<Props>`
  position: fixed;
  top: ${(props) => props.top + "px"};
  display: ${(props) => !!!props.top && "none"};
  &:before {
    content: "${(props) => HIGHLIGHT_TYPES[props.type].label}  ";
    background: ${(props) => HIGHLIGHT_TYPES[props.type].color};
    margin-right: 5px;
    border-radius: 3px;
    padding: 3px;
    font-size: 12px;
    font-weight: 500;
  }
`;
