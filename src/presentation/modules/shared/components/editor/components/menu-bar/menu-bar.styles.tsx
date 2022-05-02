import { EuiButton, EuiButtonIcon } from "@elastic/eui";
import styled from "styled-components";

export const MenuButton = styled(EuiButton)`
  width: 40px;
  min-width: 40px;
  height: 40px;
  > .euiButton__content {
    padding: 0;
  }
  background: #fff;
  border: 1px solid #d3dae6;
`;

export const MenuIconButton = styled(EuiButtonIcon)`
  &.euiButtonIcon--text {
    background-color: #fff;
  }
  min-width: 40px;
  border: 1px solid #d3dae6;
`;

export const vr = styled.div`
  border-left: 1px solid #ebeef5;
  height: 100%;
`;
