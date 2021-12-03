import { Editor, ReactRenderer } from "@tiptap/react";
import { Range } from "@tiptap/core";
import {
  SuggestionKeyDownProps,
  SuggestionOptions,
  SuggestionProps,
} from "@tiptap/suggestion";
import tippy from "tippy.js";
import { Instance, Props } from "tippy.js";
import { CommandList } from "./command-list";

export default {
  items: ({ query }: { query: string; editor: Editor }) => {
    return [
      {
        title: "Large Heading",
        icon: "editorHeading",
        command: ({ editor, range }: { editor: Editor; range: Range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode("heading", { level: 1 })
            .run();
        },
      },
      {
        title: "Medium Heading",
        icon: "editorHeading",
        command: ({ editor, range }: { editor: Editor; range: Range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode("heading", { level: 2 })
            .run();
        },
      },
      {
        title: "Small Heading",
        icon: "editorHeading",
        command: ({ editor, range }: { editor: Editor; range: Range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode("heading", { level: 3 })
            .run();
        },
      },
      {
        title: "Paragraph",
        icon: "string",
        command: ({ editor, range }: { editor: Editor; range: Range }) => {
          editor.chain().focus().deleteRange(range).setParagraph().run();
        },
      },
      {
        title: "Bulleted List",
        icon: "editorUnorderedList",
        command: ({ editor, range }: { editor: Editor; range: Range }) => {
          editor.chain().focus().deleteRange(range).toggleBulletList().run();
        },
      },
      {
        title: "Numbered List",
        icon: "editorOrderedList",
        command: ({ editor, range }: { editor: Editor; range: Range }) => {
          editor.chain().focus().deleteRange(range).toggleOrderedList().run();
        },
      },
      {
        title: "TODO List",
        icon: "checkInCircleFilled",
        command: ({ editor, range }: { editor: Editor; range: Range }) => {
          editor.chain().focus().deleteRange(range).toggleTaskList().run();
        },
      },
      {
        title: "Divider",
        icon: "minus",
        command: ({ editor, range }: { editor: Editor; range: Range }) => {
          editor.chain().focus().setHorizontalRule().run();
        },
      },
      {
        title: "Image",
        icon: "image",
        command: ({ editor, range }: { editor: Editor; range: Range }) => {
          editor.chain().focus().deleteRange(range).setNode("paragraph").run();
        },
      },
    ];
  },

  render: () => {
    let component: ReactRenderer<unknown>;
    let popup: Instance<Props>[];

    return {
      onStart: (props: SuggestionProps) => {
        component = new ReactRenderer(CommandList, {
          props,
          editor: props.editor,
        });

        popup = tippy("body", {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start",
        });
      },

      onUpdate(props: SuggestionProps) {
        component.updateProps(props);

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
      },

      onKeyDown(props: SuggestionKeyDownProps) {
        if (props.event.key === "Escape") {
          popup[0].hide();
          return true;
        }
      },

      onExit() {
        popup[0].destroy();
        component.destroy();
      },
    };
  },
} as unknown as SuggestionOptions;
