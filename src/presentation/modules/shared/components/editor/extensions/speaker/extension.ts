import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { Speaker } from "./speaker";

export interface SpeakerOptions {
  name: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    speaker: {
      /**
       * Add an image
       */
      setName: (name: string) => ReturnType;
    };
  }
}

export const SpeakerExtension = Node.create<SpeakerOptions>({
  name: "speaker",

  group: "block",

  atom: true,
  parseHTML() {
    return [
      {
        tag: "span",
      },
    ];
  },

  addCommands() {
    return {
      setName:
        (name) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { name },
          });
        },
    };
  },

  addAttributes() {
    return {
      name: {
        parseHTML: (element) => element.getAttribute("speaker-name"),
        renderHTML: (attributes) => {
          if (!attributes.name) {
            return {};
          }

          return {
            ...attributes,
            name: attributes.name,
            default: undefined,
          };
        },
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Speaker);
  },
});
