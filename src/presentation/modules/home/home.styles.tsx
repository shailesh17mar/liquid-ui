import styled from "styled-components";

interface Props {
  isPlaceholder?: boolean;
}
export const IconContainer = styled.div<Props>`
  border-radius: 20px;
  border: ${(props) => (props.isPlaceholder ? "dashed" : "solid")} 1px #d3dae6;
  height: 120px;
  width: 120px;
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
  svg {
    width: 40px;
    height: 40px;
  }
  :hover {
    background-color: #e0e2e6;
  }
`;
export const ProjectButton = styled.div`
  text-align: center;
  cursor: pointer;
  width: 120px;
`;
