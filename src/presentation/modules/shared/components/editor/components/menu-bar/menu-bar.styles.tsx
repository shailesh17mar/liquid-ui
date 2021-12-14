import { EuiButton, EuiButtonIcon } from "@elastic/eui";
import styled from "styled-components";

export const MenuButton = styled(EuiButton)`
  width: 40px;
  min-width: 40px;
  height: 40px;
  > .euiButton__content {
    padding: 0;
  }
  background: rgba(105, 112, 125, 0.03);
`;

export const MenuIconButton = styled(EuiButtonIcon)`
  &.euiButtonIcon--text {
    background-color: rgba(105, 112, 125, 0.03);
  }
`;

export const vr = styled.div`
  border-left: 1px solid #ebeef5;
  height: 100%;
`;
