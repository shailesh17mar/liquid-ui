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

  // “:)	Excited
  mark[data-color="#fbbc04"]:before {
    content: "😁";
  }
  // :( 	Angry
  mark[data-color="#f28b82"]:before {
    content: "😡";
  }
  // :|	Embarrassed
  mark[data-color="#fdcfe8"]:before {
    content: "😳";
  }
  // ☇ Pain or problem (symbol is a lightning bolt)
  mark[data-color="#fff475"]:before {
    content: "☇";
  }
  // ⨅ 	Goal or job-to-be-done (symbol is a soccer/football goal)
  mark[data-color="#ccff90"]:before {
    content: "🥅";
  }
  // ☐ 	Obstacle
  mark[data-color="#e6c9a8"]:before {
    content: "🪨";
  }
  // 	Workaround
  mark[data-color="#d7aefb"]:before {
    content: "⤴";
  }
  // 	Background or context (symbol is a distant mountain)
  mark[data-color="#aecbfa"]:before {
    content: "^";
  }
  // 	Money or budgets or purchasing process
  mark[data-color="#178117"]:before {
    content: "＄";
  }
  //  	Feature request or purchasing criteria
  mark[data-color="#e8eaed"]:before {
    content: "☑";
  }
  //  	Mentioned a specific person or company
  mark[data-color="#cbf0f8"]:before {
    content: "♀";
  }

  span[data-hc="excited"] {
    background: #fbbc04;
  }
  span[data-hc="angry"] {
    background: #f28b82;
  }
  span[data-hc="embarrassed"] {
    background: #fdcfe8;
  }
  span[data-hc="pain"] {
    background: #fff475;
  }
  span[data-hc="goal"] {
    background: #ccff90;
  }
  span[data-hc="excited"] {
    background: #fbbc04;
  }
  span[data-hc="obstacle"] {
    background: #e6c9a8;
  }
  span[data-hc="workaround"] {
    background: #d7aefb;
  }
  span[data-hc="context"] {
    background: #aecbfa;
  }
  span[data-hc="money"] {
    background: #77b477;
  }
  span[data-hc="feature"] {
    background: #e8eaed;
  }
  span[data-hc="entity"] {
    background: #cbf0f8;
  }

  p {
    color: #202124;
    span:first-of-type {
      font-weight: 600;
    }
    span:nth-child(2) {
      display: none;
    }
  }

  p::selection {
    background: rgba(0, 119, 204, 0.1);
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
