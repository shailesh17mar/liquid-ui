import { Mark, markInputRule, markPasteRule } from "@tiptap/core";

export interface HighlightOptions {}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    highlight: {
      /**
       * Set a highlight mark
       */
      setHighlight: (attributes?: {
        highlightId: string;
        highlightCategory: string;
      }) => ReturnType;
      /**
       * Toggle a highlight mark
       */
      toggleHighlight: (attributes?: {
        highlightId: string;
        highlightCategory: string;
      }) => ReturnType;
      /**
       * Unset a highlight mark
       */
      unsetHighlight: () => ReturnType;
    };
  }
}

export const inputRegex = /(?:^|\s)((?:==)((?:[^~]+))(?:==))$/;
export const pasteRegex = /(?:^|\s)((?:==)((?:[^~]+))(?:==))/g;

export const HighlightExtension = Mark.create<HighlightOptions>({
  name: "highlight",

  addOptions() {
    return {
      HTMLAttributes: this.parent?.(),
    };
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      highlightCategory: {
        parseHTML: (element) => element.getAttribute("data-hc"),
        renderHTML: (attributes) => {
          return {
            ...attributes,
            "data-hc": attributes.highlightCategory,
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
    };
  },

  parseHTML() {
    return [
      {
        tag: "timeOffset",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", HTMLAttributes, 0];
  },

  addCommands() {
    return {
      setHighlight:
        (attributes) =>
        ({ commands }) => {
          return commands.setMark(this.name, attributes);
        },
      toggleHighlight:
        (attributes) =>
        ({ commands }) => {
          return commands.toggleMark(this.name, attributes);
        },
      unsetHighlight:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      "Mod-Shift-h": () => this.editor.commands.toggleHighlight(),
    };
  },

  addInputRules() {
    return [
      markInputRule({
        find: inputRegex,
        type: this.type,
      }),
    ];
  },

  addPasteRules() {
    return [
      markPasteRule({
        find: pasteRegex,
        type: this.type,
      }),
    ];
  },
});
