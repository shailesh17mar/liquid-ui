import { EuiButtonIcon } from "@elastic/eui";
import { NodeViewWrapper } from "@tiptap/react";
import styled from "styled-components";

export const Placeholder = styled.div`
  background: #fbfcfd;
  padding: 1rem 2rem;
  border-radius: 8px;
`;

export const FileContainer = styled(NodeViewWrapper)`
  margin: 2rem 0;
`;

export const RemoveButton = styled(EuiButtonIcon)`
  position: absolute;
  right: 1rem;
`;
