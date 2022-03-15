import { EuiCard, EuiFieldText, transparentize } from "@elastic/eui";
import styled from "styled-components";

interface Props {
  color: string;
}
export const Card = styled(EuiCard)<Props>`
  & .euiCard__titleButton {
    font-weight: 500;
    font-size: 1rem;
    /* color: ${(props) => props.color}; */
  }
  & .euiCard__content {
    /* background-color: ${(props) => props.color}; */
    color: ${(props) => props.color};
  }
  background: ${(props) => transparentize(props.color, 0.4)};
  border: solid 1px ${(props) => props.color};
  /* box-shadow: 0 0.9px 4px -1px rgb(0 0 0 / 8%), 0 2.6px 8px -1px rgb(0 0 0 / 6%), */
  /* 0 5.7px 12px -1px rgb(0 0 0 / 5%), 0 15px 15px -1px rgb(0 0 0 / 4%); */
`;

export const NewTagField = styled(EuiFieldText)`
  background-color: #fff;
`;
