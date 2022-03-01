import { Mark, getMarkAttributes, mergeAttributes } from "@tiptap/core";

export interface TimeOffsetOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    timeOffset: {
      setTHighlight: (attributes?: {
        highlightId: string;
        highlightCategory: string;
      }) => ReturnType;
      /**
       * Toggle a highlight mark
       */
      toggleTHighlight: (attributes?: {
        highlightId: string;
        highlightCategory: string;
      }) => ReturnType;
      /**
       * Unset a highlight mark
       */
      unsetTHighlight: () => ReturnType;
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

  addCommands() {
    return {
      setTHighlight:
        (attributes) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, {
            ...this.parent?.(),
            attributes,
          });
        },
      toggleTHighlight:
        (attributes) =>
        ({ commands, state }) => {
          const existingAttributes = getMarkAttributes(state, this.type);
          return commands.updateAttributes(this.name, {
            ...this.parent?.(),
            ...attributes,
          });
        },
      unsetTHighlight:
        () =>
        ({ commands, state }) => {
          const existingAttributes = getMarkAttributes(state, this.type);
          return commands.updateAttributes(this.name, {
            ...existingAttributes,
            highlightId: undefined,
            highlightCategory: undefined,
          });
        },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
});
