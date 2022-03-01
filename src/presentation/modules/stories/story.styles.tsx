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
`;
