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
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Image from "@tiptap/extension-image";
import Color from "@tiptap/extension-color";
import Paragraph from "@tiptap/extension-paragraph";
import Collaboration from "@tiptap/extension-collaboration";
import TaskItem from "@tiptap/extension-task-item";
import { MenuBar } from "./components/menu-bar/menu-bar";
import {
  EuiFlexGroup,
  EuiFlexItem,
  euiPaletteColorBlindBehindText,
} from "@elastic/eui";
import commands from "./extensions/commander/commands";
import { Commander } from "./extensions/commander/commander";
import TextStyle from "@tiptap/extension-text-style";
import { TranscriptExtension } from "./extensions/transcript/extension";
import { ImageExtension } from "./extensions/image/extension";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "presentation/context/auth-context";
import { QuickActionButton } from "./editor.styles";
import TimeOffset from "./extensions/time-offset";
import { useRecoilState, useResetRecoilState } from "recoil";
// import { WebsocketProvider } from "main/factories/websocket-provider";
import { VideoExtension } from "./extensions/video/extension";
import { HocuspocusProvider } from "@hocuspocus/provider";
import {
  highlightAtom,
  HighlightState,
  TagManager,
} from "./components/highlight-control/tag-manager";
import { nanoid } from "nanoid";
import { HighlightExtension } from "./extensions/transcript/highlight";
import _ from "lodash";

const CustomDocument = Document.extend({
  content: `paragraph block* paragraph`,
});

export const CustomParagraph = Paragraph.extend({
  addAttributes() {
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
      startTime: {
        parseHTML: (element) => element.getAttribute("data-time"),
        renderHTML: (attributes) => {
          return {
            ...attributes,
            "data-time": attributes.startTime,
          };
        },
      },
      duration: {
        parseHTML: (element) => element.getAttribute("data-tc"),
        renderHTML: (attributes) => {
          return {
            ...attributes,
            "data-tc": attributes.duration,
          };
        },
      },
      class: {
        parseHTML: (element) => element.getAttribute("class"),
        renderHTML: (attributes) => {
          return {
            ...attributes,
            class: attributes.class,
          };
        },
      },
    };
  },
});

// const TIMEOUT = 100 + Math.floor(Math.random() * 1000);
const TIMEOUT = 3000 + Math.floor(Math.random() * 7000);

interface EditorProps {
  documentId: string;
  provider: HocuspocusProvider;
  content?: JSONContent | string;
  withHighlighting?: Boolean;
  onSave: Function;
}

export const Editor: React.FC<EditorProps> = ({
  provider,
  withHighlighting,
}) => {
  const [docState, setDocState] = useState<JSONContent>();
  const [isUploading, setIsUploading] = useState(false);
  const resetHighlight = useResetRecoilState(highlightAtom);
  const [highlightState, setHighlightState] = useRecoilState(highlightAtom);
  const [temp, setTemp] = useState<string>(nanoid());
  const visColorsBehindText = euiPaletteColorBlindBehindText();
  const { user } = useAuth();

  const extensions = [
    CustomDocument,
    Underline,
    TaskList,
    Image.configure({
      HTMLAttributes: {
        class: "editor-image",
      },
    }),
    TextStyle,
    TimeOffset,
    HighlightExtension,
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
      paragraph: false,
    }),
    TranscriptExtension,
    VideoExtension,
    ImageExtension,
    CustomParagraph,
    Placeholder.configure({
      showOnlyWhenEditable: true,
      placeholder: ({ node }) => {
        if (node.type.name === "heading") {
          return "Heading";
        }
        if (node.type.name === "paragraph") {
          return "Type '/' for commands";
        }
        return "";
      },
    }),
    Collaboration.configure({
      document: provider.document,
    }),
    CollaborationCursor.configure({
      provider,
      user: {
        name: user.name,
        color: visColorsBehindText[Math.floor(Math.random() * 7)],
      },
    }),
  ];

  const editor = useEditor({
    extensions,
    content: provider.document,
  });

  editor?.on("focus", () => {
    if (editor.isActive("highlight")) {
      const attributes = editor.getAttributes("highlight");
      if (!_.isEmpty(attributes)) {
        if (highlightState?.id !== attributes.highlightId) {
          console.log("testin");
          setHighlightState({
            id: attributes.highlightId,
            type: attributes.highlightCategory,
          } as HighlightState);
        }
      }
    }
  });

  // editor.getAttributes('highlight')

  const handleSave = useCallback(
    (newDocState) => {
      if (!isUploading) {
        // onSave(documentId, JSON.stringify(newDocState));
        // const meta = provider.doc.getMap("meta");
        // meta.set("lastSaved", Date.now());
      }
    },
    [isUploading]
  );

  const handleSaveDebounced = useDebouncedCallback(handleSave, TIMEOUT);

  useEffect(() => {
    handleSaveDebounced(docState);
  }, [handleSaveDebounced, docState]);

  const handleVideoClick = () => {
    editor?.chain().focus().initVideo().run();
  };

  const handleImageClick = () => {
    editor?.chain().focus().setSignedImage({}).run();
  };

  return (
    <>
      {editor && (
        <>
          {/* <BubbleMenu
            shouldShow={({ editor, view, state, oldState, from, to }) => {
              return !editor.isActive("transcriptComponent") && to > from;
            }}
            editor={editor}
          >
            {<BubbleControl editor={editor} />}
          </BubbleMenu> */}
          <BubbleMenu
            shouldShow={({ from, to }) => {
              return true;
            }}
            tippyOptions={{
              onHide() {
                resetHighlight();
                setTemp(nanoid());
              },
            }}
            editor={editor}
          >
            {withHighlighting && (
              <TagManager
                id={temp}
                editor={editor}
                isTranscript={editor.isActive("transcriptComponent")}
              />
            )}
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
        <EuiFlexItem
        // style={{ paddingBottom: 200 }}
        // onClick={() => {
        //   editor?.chain().focus();
        // }}
        >
          <EditorContent editor={editor} />
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiFlexGroup>
            <EuiFlexItem grow={false}>
              <QuickActionButton
                iconType="videoPlayer"
                color="primary"
                onClick={handleVideoClick}
              >
                Video
              </QuickActionButton>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <QuickActionButton
                iconType="image"
                color="danger"
                onClick={handleImageClick}
              >
                Image
              </QuickActionButton>
            </EuiFlexItem>
            {/* <EuiFlexItem grow={false}>
              <QuickActionButton iconType="paperClip" color="warning">
                File
              </QuickActionButton>
            </EuiFlexItem> */}
            {/* <EuiFlexItem grow={false}>
              <QuickActionButton
                color="success"
                iconType="editorTable"
                role="button"
              >
                Table
              </QuickActionButton>
            </EuiFlexItem> */}
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};
