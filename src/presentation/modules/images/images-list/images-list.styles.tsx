import styled from "styled-components";
import Pagination from "react-bootstrap/Pagination";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto;
  grid-gap: 10px;
  padding: 10px;
  margin: 0 auto;
  justify-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

export const GridItem = styled.div`
  text-align: center;
  padding: 20px 0;
`;

export const PaginationBar = styled(Pagination)`
  margin-top: 20px;
  justify-content: center;
`;
