import { EuiFlexGroup, EuiText } from "@elastic/eui";
import styled from "styled-components";

interface Props {
  isPlaceholder?: boolean;
}
export const Container = styled(EuiFlexGroup)`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  max-width: 1200px;
`;
export const IconContainer = styled.div<Props>`
  height: 40px;
  width: 40px;
  display: flex;
  /* margin-bottom: 10px; */
  align-items: center;
  justify-content: center;
  svg {
    width: 20px;
    height: 20px;
  }
`;
export const ProjectButton = styled(EuiFlexGroup)`
  /* text-align: center; */
  cursor: pointer;
  border: solid 1px #d3dae6;
  border-radius: 10px;
  padding: 10px;
  :hover {
    background-color: #e0e2e6;
  }
  /* width: 120px; */
`;

export const Title = styled(EuiText)`
  max-width: 200px;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
