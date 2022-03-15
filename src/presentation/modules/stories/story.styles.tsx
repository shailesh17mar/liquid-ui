import { EuiPageContentBody } from "@elastic/eui";
import { Annotation } from "main/pages/make-story-details-page";
import styled from "styled-components";
import {
  HIGHLIGHT_COLORS,
  HIGHLIGHT_TYPES,
} from "../shared/components/editor/components/highlight-control/color-picker";

interface BodyProps {
  annotation: Annotation;
}
export const StoryDocument = styled(EuiPageContentBody)<BodyProps>`
  span[data-hc="default"] {
    background: #cbf0f8;
  }
  span[data-hc="mixed"] {
    background: #feefc3;
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
  ${(props) =>
    Object.keys(props.annotation).map((id) => {
      return `span[data-hid="${id}"] { background:${
        HIGHLIGHT_TYPES[props.annotation[id].type as HIGHLIGHT_COLORS].color
      } ; }`;
    })}
`;
interface Props {
  type: string;
  top?: number;
  // annotations: Annotation;
}
export const TagAnnotation = styled.div<Props>`
  position: fixed;
  top: ${(props) => props.top || -8000 + "px"};
  /* display: ${(props) => (props.top ? "block" : "none")}; */
`;
