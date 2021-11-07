import styled from "styled-components";

export const Canvas = styled.div`
  display: inline-grid;
  overflow: auto;
  justify-content: center;
`;

export const ControlPanel = styled.div`
  justify-content: center;
`;

export const ImageDetailContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  display: grid;
  grid-gap:1rem;

  @media (min-width: 600px) {
    grid-template-columns: 3fr 1fr;
  }
`;
