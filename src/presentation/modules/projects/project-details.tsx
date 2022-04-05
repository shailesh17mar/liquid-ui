import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiPopover,
  EuiTitle,
} from "@elastic/eui";
import { Editor } from "../shared/components/editor/editor";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  useProject,
  useUpdateProject,
} from "../../../core/modules/projects/hooks";
import { useDebouncedCallback } from "use-debounce";
import { ContentLoader } from "../shared/components/content-loader/content-loader";
import {
  HocuspocusProvider,
  onAuthenticationFailedParameters,
} from "@hocuspocus/provider";
import Picker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import { useAuth } from "presentation/context/auth-context";

export const ProjectDetails: React.FC = () => {
  const { getToken } = useAuth();
  const { id } = useParams() as { id: string };
  const { data: project, isLoading } = useProject(id);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const [chosenEmoji, setChosenEmoji] = useState<string | undefined>();
  const mutation = useUpdateProject();

  const provider = useMemo(() => {
    return new HocuspocusProvider({
      url: process.env.REACT_APP_COLLAB_ENGINE || "ws://localhost:5000",
      name: `story-${id}`,
      token: getToken,
      onAuthenticationFailed: (data: onAuthenticationFailedParameters) => {
        if (retryCount < 3) setRetryCount((retryCount) => retryCount + 1);
      },
    });
  }, [getToken, id, retryCount]);

  const handleDocumentEditing = async () => {};
  const handleIconChange = (id: string, icon: string) => {
    mutation.mutateAsync({
      id,
      icon,
    });
  };
  const handleNameChange = useDebouncedCallback((id, name) => {
    if (project) {
      mutation.mutateAsync({
        id,
        name,
      });
    }
  }, 2000);

  useEffect(() => {
    if (project?.icon) setChosenEmoji(project.icon);
  }, [project?.icon]);
  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);
  return (
    <EuiPanel>
      <EuiFlexGroup
        style={{ width: 900, margin: "0 auto" }}
        justifyContent="spaceAround"
        direction="column"
      >
        {project && !isLoading ? (
          <>
            <EuiFlexItem>
              <EuiFlexGroup
                justifyContent="center"
                alignItems="center"
                gutterSize="s"
              >
                <EuiFlexItem grow={false}>
                  <EuiPopover
                    button={
                      chosenEmoji ? (
                        <EuiButtonEmpty
                          style={{
                            fontSize: "60px",
                            lineHeight: "100px",
                          }}
                          onClick={onButtonClick}
                        >
                          {chosenEmoji}
                        </EuiButtonEmpty>
                      ) : (
                        <EuiButton
                          color="text"
                          size="s"
                          iconType={BsEmojiSmile}
                          onClick={onButtonClick}
                        >
                          Add Icon
                        </EuiButton>
                      )
                    }
                    isOpen={isPopoverOpen}
                    closePopover={closePopover}
                  >
                    <Picker
                      onEmojiClick={(event, emojiObject) => {
                        setChosenEmoji(emojiObject.emoji);
                        handleIconChange(id, emojiObject.emoji);
                        closePopover();
                      }}
                    />
                  </EuiPopover>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiTitle size="l">
                    <span
                      className="euiTitle--large"
                      contentEditable
                      onInput={(e: any) => {
                        handleNameChange(id, e.target.innerText);
                      }}
                    >
                      {project.name}
                    </span>
                  </EuiTitle>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
            <hr />
            <EuiFlexItem
              style={{
                margin: "12px 0",
              }}
            >
              <EuiFlexGroup gutterSize="none">
                <EuiFlexItem>
                  {
                    <Editor
                      onSave={handleDocumentEditing}
                      documentId={id}
                      provider={provider}
                    />
                  }
                </EuiFlexItem>
                <EuiFlexItem grow={false}></EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
            <hr />
          </>
        ) : (
          <ContentLoader />
        )}
      </EuiFlexGroup>
    </EuiPanel>
  );
};
