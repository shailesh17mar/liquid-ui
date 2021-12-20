import Placeholder from "@tiptap/extension-placeholder";
import Document from "@tiptap/extension-document";
import Underline from "@tiptap/extension-underline";
import {
  EditorContent,
  useEditor,
  BubbleMenu,
  JSONContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useDebouncedCallback } from "use-debounce";
import TaskList from "@tiptap/extension-task-list";
import DropCursor from "@tiptap/extension-dropcursor";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Image from "@tiptap/extension-image";
import Color from "@tiptap/extension-color";
import Collaboration from "@tiptap/extension-collaboration";
import { Highlight } from "../transcript/highlight";
import TaskItem from "@tiptap/extension-task-item";
import { MenuBar } from "./components/menu-bar/menu-bar";
import { EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import commands from "./components/commander/commands";
import { Commander } from "./components/commander/commander";
import TextStyle from "@tiptap/extension-text-style";
import { BubbleControl } from "./components/bubble-control/bubble-control";
import { TranscriptComponent } from "../transcript/extension";
import { HighlightControl } from "./components/highlight-control/highlight-control";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "presentation/context/auth-context";
import useWebRtcProvider from "./hooks/use-webrtc-provider";
import { WebrtcProvider } from "y-webrtc";
import { Doc } from "yjs";

const CustomDocument = Document.extend({
  content: "heading block*  transcriptComponent*",
});
const TIMEOUT = 2000 + Math.floor(Math.random() * 6000);

interface EditorProps {
  documentId: string;
  provider: WebrtcProvider;
  content: JSONContent | string;
  onSave: Function;
}

export const Editor: React.FC<EditorProps> = ({
  provider,
  content,
  documentId,
  onSave,
}) => {
  const [docState, setDocState] = useState<JSONContent>();
  const { user } = useAuth();

  const editor = useEditor({
    extensions: [
      CustomDocument,
      Underline,
      TaskList,
      Image.configure({
        HTMLAttributes: {
          class: "editor-image",
        },
      }),
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
        history: false,
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
      Collaboration.configure({
        document: provider.doc,
      }),
      CollaborationCursor.configure({
        provider,
        user: {
          name: user.name,
          color: "#f783ac",
        },
      }),
    ],
    content,
    onUpdate({ editor }) {
      const content = editor.getJSON();
      handleChange(content);
      // if (content) setDocState(content);
      // The content has changed.
    },
  });

  const handleChange = useCallback(
    (content) => {
      console.log("handle change");
      setDocState(content);
    },
    [setDocState]
  );
  const handleSave = useCallback(
    (newDocState) => {
      onSave(documentId, JSON.stringify(newDocState));
      const meta = provider.doc.getMap("meta");
      meta.set("lastSaved", Date.now());
    },
    [documentId, onSave, provider.doc]
  );
  const handleSaveDebounced = useDebouncedCallback(handleSave, TIMEOUT);

  useEffect(() => {
    handleSaveDebounced(docState);
  }, [handleSaveDebounced, docState]);

  return (
    <>
      {editor && (
        <form style={{ display: "none" }}>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={(e: any) => {
              const files = e.target.files;
              editor
                .chain()
                .focus()
                .setImage({
                  src: window.URL.createObjectURL(files[0]),
                })
                .run();
            }}
          />
        </form>
      )}
      {editor && (
        <>
          <BubbleMenu
            shouldShow={({ editor, view, state, oldState, from, to }) => {
              return !editor.isActive("transcriptComponent") && to > from;
            }}
            editor={editor}
          >
            <BubbleControl editor={editor} />
          </BubbleMenu>
          <BubbleMenu
            shouldShow={({ editor, view, state, oldState, from, to }) => {
              return editor.isActive("transcriptComponent") && to > from;
            }}
            editor={editor}
          >
            <HighlightControl
              id={editor.getAttributes("highlight").id}
              editor={editor}
            />
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
