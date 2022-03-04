import { Node, mergeAttributes } from "@tiptap/core";
import { JSONContent, ReactNodeViewRenderer } from "@tiptap/react";
import { Transcript } from "./transcript";

export interface TranscriptOptions {
  transcriptId: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    transcript: {
      /**
       * Add transcript
       */
      setTranscript: (
        options: TranscriptOptions | undefined,
        content: JSONContent[]
      ) => ReturnType;
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
    };
  },

  addAttributes() {
    return {
      transcriptId: {
        parseHTML: (element) => element.getAttribute("transcriptId"),
        renderHTML: (attributes) => {
          return {
            ...attributes,
            transcriptId: attributes.transcriptId,
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
