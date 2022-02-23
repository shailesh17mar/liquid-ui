import { Node, mergeAttributes } from "@tiptap/core";
import { Content, JSONContent, ReactNodeViewRenderer } from "@tiptap/react";
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
        options: TranscriptOptions | undefined,
        content: JSONContent[]
      ) => ReturnType;
      initTranscript: () => ReturnType;
    };
  }
}

export const TranscriptExtension = Node.create<TranscriptOptions>({
  name: "transcriptComponent",

  group: "block",

  content: "paragraph*",
  marks: "_",

  atom: true,
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
        (options, content) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
            content,
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
            default: undefined,
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
            default: undefined,
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
