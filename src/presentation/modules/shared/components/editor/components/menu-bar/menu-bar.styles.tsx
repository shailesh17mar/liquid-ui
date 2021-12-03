import { EuiButton } from "@elastic/eui";
import styled from "styled-components";

export const MenuButton = styled(EuiButton)`
  width: 40px;
  min-width: 40px;
  height: 40px;
  > .euiButton__content {
    padding: 0;
  }
`;

export const vr = styled.div`
  border-left: 1px solid #ebeef5
  height: 100%;
`;
