import { EuiCard, EuiFieldText } from "@elastic/eui";
import styled from "styled-components";

export const Card = styled(EuiCard)`
  & .euiCard__titleButton {
    font-weight: 400;
  }
`;

export const NewTagField = styled(EuiFieldText)`
  background-color: #fff;
`;
