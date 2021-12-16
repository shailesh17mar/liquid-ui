import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { Transcript } from "./transcript";

export interface TranscriptOptions {
  id?: string;
  video?: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    transcript: {
      /**
       * Add an image
       */
      setTranscript: (
        options: { id?: string; video?: string } | undefined
      ) => ReturnType;
      initTranscript: () => ReturnType;
    };
  }
}

export const TranscriptComponent = Node.create<TranscriptOptions>({
  name: "transcriptComponent",

  group: "block",

  content: "paragraph+",
  marks: "_",

  parseHTML() {
    return [
      {
        tag: "transcript",
      },
    ];
  },

  addCommands() {
    return {
      setTranscript:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
      initTranscript:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
          });
        },
    };
  },

  addAttributes() {
    return {
      id: {
        parseHTML: (element) => element.id,
        renderHTML: (attributes) => {
          return {
            ...attributes,
            id: attributes.id,
          };
        },
      },
      video: {
        parseHTML: (element) => element.getAttribute("video"),
        renderHTML: (attributes) => {
          if (!attributes.video) {
            return {};
          }

          return {
            ...attributes,
            video: attributes.video,
          };
        },
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ["transcript", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Transcript);
  },
});
