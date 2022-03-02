import styled from "styled-components";

interface Props {
  type: string;
  top?: number;
}
export const TagAnnotation = styled.div<Props>`
  position: fixed;
  top: ${(props) => props.top + "px"};
  display: ${(props) => !!!props.top && "none"};
`;
