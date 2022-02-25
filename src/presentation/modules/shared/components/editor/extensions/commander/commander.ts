import Suggestion, { SuggestionOptions } from "@tiptap/suggestion";
import { Extension } from "@tiptap/react";

export const Commander = Extension.create({
  name: "commander",

  addOptions() {
    return {
      suggestion: {
        char: "/",
        startOfLine: true,
        command: ({ editor, range, props }) => {
          props.command({ editor, range, props });
        },
      } as SuggestionOptions,
    };
  },

  addProseMirrorPlugins() {
    return [Suggestion({ ...this.options.suggestion, editor: this.editor })];
  },
});
