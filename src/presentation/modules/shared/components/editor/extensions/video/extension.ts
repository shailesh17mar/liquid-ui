import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { Video } from "./video";

export interface VideoOptions {
  id?: string;
  video?: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    video: {
      /**
       * Add an image
       */
      setVideo: (options: VideoOptions | undefined) => ReturnType;
      initVideo: () => ReturnType;
    };
  }
}

export const VideoExtension = Node.create<VideoOptions>({
  name: "videoComponent",

  group: "block",

  atom: true,
  parseHTML() {
    return [
      {
        tag: "video",
      },
    ];
  },

  addCommands() {
    return {
      setVideo:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
      initVideo:
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
    return ["video", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Video);
  },
});
