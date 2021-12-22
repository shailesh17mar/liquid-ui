import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { Image } from "./image";

export interface ImageOptions {
  key?: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    s3Image: {
      /**
       * Add an image
       */
      setSignedImage: (options: ImageOptions) => ReturnType;
    };
  }
}
export const ImageExtension = Node.create<ImageOptions>({
  name: "s3Image",

  group: "block",

  atom: true,

  addAttributes() {
    return {
      key: {
        default: undefined,
      },
    };
  },

  addCommands() {
    return {
      setSignedImage:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  parseHTML() {
    return [
      {
        tag: "s3-image",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["s3-image", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Image);
  },
});
