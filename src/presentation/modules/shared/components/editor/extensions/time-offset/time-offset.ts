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
        default: "-1",
        parseHTML: (element) => element.getAttribute("data-m"),
        renderHTML: (attributes) => {
          return {
            ...attributes,
            "data-m": attributes.startTime,
          };
        },
      },
      duration: {
        default: "-1",
        parseHTML: (element) => element.getAttribute("data-d"),
        renderHTML: (attributes) => {
          return {
            ...attributes,
            "data-d": attributes.duration,
          };
        },
      },
      confidence: {
        default: "0",
        parseHTML: (element) => element.getAttribute("data-confidence"),
        renderHTML: (attributes) => {
          return {
            ...attributes,
            "data-confidence": attributes.confidence,
          };
        },
      },
      class: {
        default: "",
        parseHTML: (element) => element.getAttribute("class"),
        renderHTML: (attributes) => {
          return {
            ...attributes,
            class: attributes.class,
          };
        },
      },
      highlightId: {
        parseHTML: (element) => element.getAttribute("data-hid"),
        renderHTML: (attributes) => {
          return {
            ...attributes,
            "data-hid": attributes.highlightId,
          };
        },
      },
      highlightCategory: {
        parseHTML: (element) => element.getAttribute("data-hc"),
        renderHTML: (attributes) => {
          return {
            ...attributes,
            "data-hc": attributes.highlightCategory,
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
