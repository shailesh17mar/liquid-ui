import { EuiButton, EuiButtonIcon } from "@elastic/eui";
import { NodeViewWrapper } from "@tiptap/react";
import ReactPlayer from "react-player";
import styled from "styled-components";

export const DeleteButton = styled(EuiButton)`
  visibility: hidden;
  position: absolute;
  right: 1rem;
  top: 1rem;
`;

export const VideoContainer = styled(NodeViewWrapper)`
  margin: 1rem 0;
  position: relative;
  border: 1px solid #d3dae6;
  border-radius: 0.5rem;

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

  &:hover ${DeleteButton} {
    visibility: visible;
  }
`;

export const VideoPlayer = styled(ReactPlayer)`
  margin: 0 auto;
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

export const VideoPlayerSkeleton = styled.div`
  background: rgba(0, 0, 0, 0.1);
  width: 768px;
  height: 428px;
  margin: 0 auto;
  margin-bottom: 20px;
`;
