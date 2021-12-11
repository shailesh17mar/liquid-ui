import Placeholder from "@tiptap/extension-placeholder";
import Document from "@tiptap/extension-document";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import DropCursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Color from "@tiptap/extension-color";
import { Highlight } from "../transcript/highlight";
import TaskItem from "@tiptap/extension-task-item";
import { MenuBar } from "./components/menu-bar/menu-bar";
import { EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import commands from "./components/commander/commands";
import { Commander } from "./components/commander/commander";
import TextStyle from "@tiptap/extension-text-style";
import { BubbleControl } from "./components/bubble-control/bubble-control";
import { TranscriptComponent } from "../transcript/extension";
import { ColorControl } from "./components/color-control/color-control";
import { data } from "../transcript/dummy";

const CustomDocument = Document.extend({
  content: "heading block* transcriptComponent*",
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
      Highlight.configure({
        multicolor: true,
      }),
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
      TranscriptComponent,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "Title goes here";
          }

          if (node.type.name === "paragraph") {
            return "Type '/' for commands";
          }
          return "";
        },
      }),
    ],
    content: `
          <h1>
            It’ll always have a heading
          </h1>
          <p>
            We're a remote company since Day 1. As the team grows, it's vital to learn from our experiments. Slite is the tool we use to do so. It helps us keep in-sync. It helps us grow. Slack/Google Docs just weren’t cutting it for knowledge preservation. The thing that shocked me the most is how teammates have ambient exposure to shared knowledge, without them being notified, or having to search for it. We're a remote company since Day 1. As the team grows, it's vital to learn from our experiments. Slite is the tool we use to do so. It helps us keep in-sync. It helps us grow.
          </p>
          <p>
          It took us forever to find the right tool for our company, we tried Evernote, Notion, Google docs, Confluence. But in one way or another, they didn’t work for us. When we tried Slite, we found something that worked great, simple, focused but also flexible. I implemented Slite at our office as a knowledge base for all of our processes and everyone has LOVED it. We now use it for all of our client meeting minutes, as personal notebooks, and training/reference material. It is amazing to have one workspace where we have all documentation from employee onboarding to guides and even technical documentation. I love how it structures documentations and you can find any information from all docs in the workspace.
          </p>
          <transcript>
          ${data}
          </transcript>
          
        `,
  });

  return (
    <>
      {editor && (
        <>
          <BubbleMenu
            shouldShow={({ editor, view, state, oldState, from, to }) => {
              return !editor.isActive("transcriptComponent");
            }}
            editor={editor}
          >
            <BubbleControl editor={editor} />
          </BubbleMenu>
          <BubbleMenu
            shouldShow={({ editor, view, state, oldState, from, to }) => {
              return editor.isActive("transcriptComponent");
            }}
            editor={editor}
          >
            <ColorControl editor={editor} />
          </BubbleMenu>
        </>
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
