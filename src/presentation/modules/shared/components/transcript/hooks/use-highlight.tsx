import { useGeneratedHtmlId } from "@elastic/eui";
import { Editor } from "@tiptap/core";
import { useEffect, useState } from "react";

export const useHighlight = (editor: Editor) => {
  const [highlights, setHighlight] = useState<
    | {
        [key: string]: {
          startNode: Node;
          startOffset: number;
          endNode: Node;
          endOffset: number;
        };
      }
    | undefined
  >();
  const id = useGeneratedHtmlId();

  useEffect(() => {
    const handleShortcuts = (event: WindowEventMap["keydown"]) => {
      const selection = document.getSelection();
      if (
        selection &&
        selection.rangeCount &&
        selection.toString().length > 0
      ) {
        const textObject: { [key: string]: string } = {
          w: "word",
          W: "word",
          s: "sentenceboundary",
          S: "sentenceboundary",
          p: "paragraphboundary",
          P: "paragraphboundary",
        };
        const jump = textObject[event.key];
        if (jump) {
          const direction =
            event.key === event.key.toLowerCase() ? "forward" : "backward";
          //@ts-ignore
          selection.modify("extend", direction, jump);
        } else if (event.key === " ") {
          event.preventDefault();
          editor.chain().focus().toggleHighlight().run();
          // const selection = document.getSelection();
          // if (
          //   selection?.getRangeAt &&
          //   selection.rangeCount &&
          //   selection.toString().length > 0
          // ) {
          //   let mark = document.createElement("mark");
          //   mark.id = id;
          //   // mark.classList.add("mark-green");
          //   const range = selection?.getRangeAt(0);
          //   setHighlight({
          //     ...highlights,
          //     [id]: {
          //       startNode: range.startContainer,
          //       startOffset: range.startOffset,
          //       endOffset: range.endOffset,
          //       endNode: range.endContainer,
          //     },
          //   });
          //   range.surroundContents(mark);
          // }
        } else if (event.key === "d" && editor.isActive("highlight"))
          editor.chain().focus().unsetHighlight().run();
      }
    };
    document.addEventListener("keydown", handleShortcuts);
    return () => {
      document.removeEventListener("keydown", handleShortcuts);
    };
  }, [highlights, id]);

  return {
    highlights,
  };
};
