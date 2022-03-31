import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { Video } from "./video";

export interface VideoOptions {
  transcriptId?: string;
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
        tag: "recording",
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
      transcriptId: {
        parseHTML: (element) => element.getAttribute("transcriptId"),
        renderHTML: (attributes) => {
          return {
            ...attributes,
            transcriptId: attributes.transcriptId,
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
    return ["recording", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Video);
  },
});
