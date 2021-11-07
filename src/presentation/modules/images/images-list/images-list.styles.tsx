import styled from "styled-components";
import Pagination from "react-bootstrap/Pagination";

export const Grid = styled.div`
  display: grid;
  grid-gap: 1rem;
  margin: 0 auto;
  justify-items: center;
  max-width: 1200px;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const GridItem = styled.div`
  text-align: center;
`;

export const PaginationBar = styled(Pagination)`
  margin-top: 20px;
  justify-content: center;
`;
