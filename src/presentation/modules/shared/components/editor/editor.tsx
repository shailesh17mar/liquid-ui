import Placeholder from "@tiptap/extension-placeholder";
import Document from "@tiptap/extension-document";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { MenuBar } from "./menu-bar";
import { EuiFlexGroup, EuiFlexItem } from "@elastic/eui";

const CustomDocument = Document.extend({
  content: "heading block*",
});

export const Editor: React.FC = () => {
  const editor = useEditor({
    extensions: [
      CustomDocument,
      Underline,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      StarterKit.configure({
        document: false,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "What’s the title?";
          }

          return "Can you add some further context?";
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
    <EuiFlexGroup direction="column" gutterSize="none" >
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
  );
};
