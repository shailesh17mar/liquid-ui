import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { Transcript } from "./transcript";

export const TranscriptComponent = Node.create({
  name: "transcriptComponent",

  group: "block",

  content: "paragraph+",
  marks: "_",

  // addAttributes() {
  //   return {
  //     count: {
  //       default: 0,
  //     },
  //   };
  // },

  parseHTML() {
    return [
      {
        tag: "transcript",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["transcript", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Transcript);
  },
});
