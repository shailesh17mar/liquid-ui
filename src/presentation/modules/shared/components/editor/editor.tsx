import Placeholder from "@tiptap/extension-placeholder";
import Document from "@tiptap/extension-document";
import Underline from "@tiptap/extension-underline";
import {
  EditorContent,
  useEditor,
  FloatingMenu,
  BubbleMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import DropCursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Color from "@tiptap/extension-color";
import TaskItem from "@tiptap/extension-task-item";
import { MenuBar } from "./components/menu-bar/menu-bar";
import { EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import commands from "./components/commander/commands";
import Highlight from "@tiptap/extension-highlight";
import { Commander } from "./components/commander/commander";
import TextStyle from "@tiptap/extension-text-style";
import { BubbleControl } from "./components/bubble-control/bubble-control";

const CustomDocument = Document.extend({
  content: "heading block*",
});

export const Editor: React.FC = () => {
  const editor = useEditor({
    extensions: [
      CustomDocument,
      Underline,
      TaskList,
      Image,
      DropCursor,
      TextStyle,
      Highlight.configure({ multicolor: true }),
      Commander.configure({
        suggestion: commands,
      }),
      Color.configure({
        types: ["textStyle"],
      }),
      TaskItem.configure({
        nested: false,
      }),
      StarterKit.configure({
        document: false,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "Title goes here";
          }

          return "Type '/' for commands";
        },
      }),
    ],
    content: `
          <h1>
            It’ll always have a heading …
          </h1>
          <p>
            … if you pass a custom document. That’s the beauty of having full control over the schema.
          </p>
        `,
  });

  return (
    <>
      {editor && (
        <BubbleMenu editor={editor}>
          <BubbleControl editor={editor} />
        </BubbleMenu>
      )}
      <EuiFlexGroup direction="column" gutterSize="none">
        <EuiFlexItem
          grow={false}
          style={{
            borderBottom: "1px solid #ebeef5",
            paddingBottom: 5,
          }}
        >
          <MenuBar editor={editor} />
        </EuiFlexItem>
        <EuiFlexItem>
          <EditorContent editor={editor} />
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};
