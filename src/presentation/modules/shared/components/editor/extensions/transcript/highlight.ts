import {
  Mark,
  markInputRule,
  markPasteRule,
  mergeAttributes,
} from "@tiptap/core";

export interface HighlightOptions {
  multicolor: boolean;
  id?: string;
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    highlight: {
      /**
       * Set a highlight mark
       */
      setHighlight: (attributes?: {
        color: string;
        type: string;
        id: string;
      }) => ReturnType;
      /**
       * Toggle a highlight mark
       */
      toggleHighlight: (attributes?: {
        color: string;
        type: string;
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

export const Highlight = Mark.create<HighlightOptions>({
  name: "highlight",

  addOptions() {
    return {
      multicolor: true,
      HTMLAttributes: this.parent?.(),
    };
  },

  addAttributes() {
    if (!this.options.multicolor) {
      return {};
    }

    return {
      id: {
        parseHTML: (element) => element.id,
        renderHTML: (attributes) => {
          return {
            ...attributes,
            id: attributes.id,
          };
        },
      },
      type: {
        default: "goal",
        parseHTML: (element) => element.getAttribute("data-type"),
        renderHTML: (attributes) => {
          if (!attributes.type) {
            return {};
          }

          return {
            ...attributes,
            "data-type": attributes.type,
          };
        },
      },
      color: {
        default: "#aecbfa",
        parseHTML: (element) =>
          element.getAttribute("data-color") || element.style.backgroundColor,
        renderHTML: (attributes) => {
          if (!attributes.color) {
            return {};
          }

          return {
            ...attributes,
            "data-color": attributes.color,
            style: `
                  background-image: linear-gradient(
                    to right,
                    ${attributes.color}1a,
                    ${attributes.color}4d 4%,
                    ${attributes.color}b3
                  )
            `,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "mark[id]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "mark",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
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
