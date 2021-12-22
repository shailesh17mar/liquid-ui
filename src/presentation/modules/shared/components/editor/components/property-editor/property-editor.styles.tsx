import { EuiFlexGroup } from "@elastic/eui";
import styled from "styled-components";

export const DragHandle = styled.div`
  width: 8px;
  height: 8px;
  svg {
    display: none;
  }
`;

export const Dragula = styled(EuiFlexGroup)`
  &:hover ${DragHandle} svg {
    display: block;
  }
`;
