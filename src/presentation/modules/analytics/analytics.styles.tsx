import { EuiEmptyPrompt, EuiHeader } from "@elastic/eui";
import styled from "styled-components";

export const Header = styled(EuiHeader)`
  box-shadow: none;
  border: none;
`;

export const EmptyPrompt = styled(EuiEmptyPrompt)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
