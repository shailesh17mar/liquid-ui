import { EuiButton, EuiButtonIcon } from "@elastic/eui";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import styled from "styled-components";

export const TranscriptContainer = styled(NodeViewWrapper)`
  margin: 1rem 0;
  position: relative;
  border-top: solid 1px black;

  .label {
    margin-left: 1rem;
    background-color: #0d0d0d;
    font-size: 0.6rem;
    letter-spacing: 1px;
    font-weight: bold;
    text-transform: uppercase;
    color: #fff;
    position: absolute;
    top: 0;
    padding: 0.25rem 0.75rem;
    border-radius: 0 0 0.5rem 0.5rem;
  }

  .euiPopover_panel {
    border: none !important;
  }
`;

export const TranscriptContent = styled(NodeViewContent)`
  /* margin-top: ; */
  /* padding: 1rem; */

  mark {
    margin: 0 -0.4em;
    padding: 0.1em 0.4em;
    border-radius: 0.8em 0.3em;
    background: transparent;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    font-weight: 500;
  }

  p {
    color: #202124;
  }

  p::selection {
    background: rgba(0, 102, 255, 0.5);
  }
`;

export const ShortcutKey = styled.div`
  min-width: 36px;
  height: 36px;
  line-height: 32px;
  text-align: center;
  border-radius: 5px;
  background: #fff;
  border: #eceef2 solid 1px;
  font-weight: 600;
  text-decoration: none;
  padding: 0 6px;
  > .euiButton__content {
    padding: 0;
  }
`;

export const Color = styled.span`
  display: inline-block;
  cursor: pointer;
  background: ${(props: { value: string }) => props.value};
  border-radius: 50%;
  height: 32px;
  line-height: 32px;
  font-weight: 500;
  text-align: center;
  width: 32px;

  &.selected {
    border: solid 2px purple;
  }
`;