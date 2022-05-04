import { EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import { Editor } from "@tiptap/react";
import { BiVideoRecording, BiImage, BiTable } from "react-icons/bi";
import { MdOutlineAudiotrack, MdAttachFile } from "react-icons/md";
import { SiGoogledrive, SiZoom } from "react-icons/si";
import { QuickActionButton } from "../../editor.styles";

interface Props {
  editor: Editor;
}

export const BottomBar = ({ editor }: Props) => {
  const handleVideoUpload = () => {
    editor.chain().focus().initVideo().run();
  };

  const handleImageUpload = () => {
    editor.chain().focus().setSignedImage({}).run();
  };

  const handleFileUpload = () => {
    editor.chain().focus().setFileUri({}).run();
  };

  const handleAudioUpload = () => {
    editor.chain().focus().initVideo().run();
  };

  const handleInsertTable = () =>
    editor
      .chain()
      .focus()
      .insertTable({
        rows: 2,
        cols: 2,
      })
      .run();

  return (
    <EuiFlexGroup>
      <EuiFlexItem grow={false}>
        <QuickActionButton
          iconType={SiGoogledrive}
          onClick={handleVideoUpload}
          colour="rgb(66, 133, 244)"
          disabled
        >
          Google Drive
        </QuickActionButton>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <QuickActionButton
          iconType={SiZoom}
          onClick={handleVideoUpload}
          colour="#2d8cff"
          disabled
        >
          Zoom
        </QuickActionButton>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <QuickActionButton
          iconType={BiVideoRecording}
          color="primary"
          onClick={handleVideoUpload}
          colour="#f94144"
        >
          Video
        </QuickActionButton>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <QuickActionButton
          iconType={MdOutlineAudiotrack}
          color="primary"
          onClick={handleAudioUpload}
          colour="#38b000"
        >
          Audio
        </QuickActionButton>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <QuickActionButton
          iconType={BiImage}
          color="danger"
          onClick={handleImageUpload}
          colour="#ffb703"
        >
          Image
        </QuickActionButton>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <QuickActionButton
          iconType={MdAttachFile}
          colour="#4361ee"
          onClick={handleFileUpload}
        >
          File
        </QuickActionButton>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <QuickActionButton
          colour="#480ca8"
          iconType={BiTable}
          onClick={handleInsertTable}
        >
          Table
        </QuickActionButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
