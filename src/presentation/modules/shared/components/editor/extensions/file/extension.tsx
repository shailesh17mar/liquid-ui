import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { File } from "./file";

export interface FileOptions {
  key?: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fileExtension: {
      /**
       * Add an image
       */
      setFileUri: (options: FileOptions) => ReturnType;
    };
  }
}
export const FileExtension = Node.create<FileOptions>({
  name: "fileExtension",

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
      setFileUri:
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
        tag: "nugget-file",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["nugget-file", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(File);
  },
});
