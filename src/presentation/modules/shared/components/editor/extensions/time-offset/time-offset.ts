import { Mark, getMarkAttributes, mergeAttributes } from "@tiptap/core";

export interface TimeOffsetOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    timeOffset: {
      /**
       * Remove spans without inline style attributes.
       */
      //   removeEmptyTextStyle: () => ReturnType;
    };
  }
}

export const TimeOffset = Mark.create<TimeOffsetOptions>({
  name: "timeOffset",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      startTime: {
        parseHTML: (element) => element.getAttribute("data-m"),
        renderHTML: (attributes) => {
          return {
            ...attributes,
            "data-m": attributes.startTime,
          };
        },
      },
      duration: {
        parseHTML: (element) => element.getAttribute("data-s"),
        renderHTML: (attributes) => {
          return {
            ...attributes,
            "data-s": attributes.duration,
          };
        },
      },
      class: {
        parseHTML: (element) => element.getAttribute("class"),
        renderHTML: (attributes) => {
          return {
            ...attributes,
            class: attributes.class,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
});
