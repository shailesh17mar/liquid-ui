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
import TaskList from "@tiptap/extension-task-list";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Image from "@tiptap/extension-image";
import Color from "@tiptap/extension-color";
import Paragraph from "@tiptap/extension-paragraph";
import Collaboration from "@tiptap/extension-collaboration";
import TaskItem from "@tiptap/extension-task-item";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
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
import { FileExtension } from "./extensions/file/extension";
import { useState } from "react";
import { useAuth } from "presentation/context/auth-context";
import TimeOffset from "./extensions/time-offset";
import { useRecoilState, useResetRecoilState } from "recoil";
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
import { TrailingNode } from "./components/trailing-node";
import { BubbleControl } from "./components/bubble-control/bubble-control";
import { BottomBar } from "./components/bottom-bar";

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

export const baseExtensions = [
  Document,
  StarterKit.configure({
    paragraph: false,
  }),
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
  TrailingNode,
  Commander.configure({
    suggestion: commands,
  }),
  Color.configure({
    types: ["textStyle"],
  }),
  TaskItem.configure({
    nested: false,
  }),
  TranscriptExtension,
  VideoExtension,
  ImageExtension,
  FileExtension,
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
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
];

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
    ...baseExtensions,
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
          setHighlightState({
            id: attributes.highlightId,
            type: attributes.highlightCategory,
          } as HighlightState);
        }
      }
    }
  });

  // const handleSave = useCallback(
  //   (newDocState) => {
  //     if (!isUploading) {
  //       // onSave(documentId, JSON.stringify(newDocState));
  //       // const meta = provider.doc.getMap("meta");
  //       // meta.set("lastSaved", Date.now());
  //     }
  //   },
  //   [isUploading]
  // );

  // const handleSaveDebounced = useDebouncedCallback(handleSave, TIMEOUT);

  // useEffect(() => {
  //   handleSaveDebounced(docState);
  // }, [handleSaveDebounced, docState]);

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
          <BubbleMenu
            shouldShow={({ editor, view, state, oldState, from, to }) => {
              return editor.isActive("table");
            }}
            editor={editor}
          >
            {<BubbleControl editor={editor} />}
          </BubbleMenu>
          <BubbleMenu
            shouldShow={({ from, to }) => {
              return to > from;
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
          {editor && <BottomBar editor={editor} />}
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};
