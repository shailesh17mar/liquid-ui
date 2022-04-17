import { EuiCard, EuiFieldText, transparentize } from "@elastic/eui";
import styled from "styled-components";

interface Props {
  color: string;
}
export const Card = styled(EuiCard)<Props>`
  & .euiCard__titleButton {
    display: none;
  }
  & .euiCard__content {
    color: ${(props) => props.color};
  }

  & .euiCard__children {
    margin-top: 0px;
  }

  & input {
    font-weight: 400;
    font-size: 14px;
    padding: 6px;
    border-radius: 6px;
    border: none;
    /* border: solid 1px ${(props) => props.color}; */
    background: ${(props) => props.color};
  }
  background-color: #fff;
  box-shadow: 0 0.9px 4px -1px rgb(0 0 0 / 8%), 0 2.6px 8px -1px rgb(0 0 0 / 6%),
    0 5.7px 12px -1px rgb(0 0 0 / 5%), 0 15px 15px -1px rgb(0 0 0 / 4%);
`;

export const NewTagField = styled(EuiFieldText)`
  background-color: #fff;
`;
