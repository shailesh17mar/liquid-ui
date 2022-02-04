import {
  EuiBetaBadge,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPageContentBody,
} from "@elastic/eui";
import { PropertiesEditor } from "../shared/components/editor/components/property-editor/property-editor";
import { Editor } from "../shared/components/editor/editor";
import { annotationState } from "main/pages/make-story-details-page";
import { useRecoilValue } from "recoil";
import { useCallback, useMemo, useRef, useState } from "react";
import { JSONContent } from "@tiptap/react";
import { matchPath, useParams } from "react-router-dom";
import { WebrtcProvider } from "y-webrtc";
import { Doc } from "yjs";
import {
  FIELD_TYPES,
  MetaProperty,
} from "../shared/components/editor/components/property-editor/types";
import {
  ParticipantController,
  StoryController,
} from "main/factories/story-factory";
import { Persons as Participant, Persons } from "models";
import { ModelInit } from "@aws-amplify/datastore";
import { useDebouncedCallback } from "use-debounce/lib";
import { StoryMetadataProvider } from "./story-context";
import { useStory, useUpdateStory } from "core/modules/stories/hooks";
import {
  useCreatePerson,
  useUpdatePerson,
} from "core/modules/participants/hooks";

const DefaultStoryDocument = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 1 },
      content: [{ type: "text", text: "It’ll always have a heading" }],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "We're a remote company since Day 1. As the team grows, it's vital to learn from our experiments. Slite is the tool we use to do so. It helps us keep in-sync. It helps us grow. Slack/Google Docs just weren’t cutting it for knowledge preservation. The thing that shocked me the most is how teammates have ambient exposure to shared knowledge, without them being notified, or having to search for it. We're a remote company since Day 1. As the team grows, it's vital to learn from our experiments. Slite is the tool we use to do so. It helps us keep in-sync. It helps us grow.",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "It took us forever to find the right tool for our company, we tried Evernote, Notion, Google docs, Confluence. But in one way or another, they didn’t work for us. When we tried Slite, we found something that worked great, simple, focused but also flexible. I implemented Slite at our office as a knowledge base for all of our processes and everyone has LOVED it. We now use it for all of our client meeting minutes, as personal notebooks, and training/reference material. It is amazing to have one workspace where we have all documentation from employee onboarding to guides and even technical documentation. I love how it structures documentations and you can find any information from all docs in the workspace.",
        },
      ],
    },
  ],
} as JSONContent;

const route = matchPath("/stories/:id", window.location.pathname);
const id = route?.params.id;
const doc = new Doc({ guid: id });
const provider = new WebrtcProvider(`story-${id}`, doc);

interface Props {
  participantController: ParticipantController;
  storyController: StoryController;
}
export const StoryDetails: React.FC<Props> = () => {
  const annotation = useRecoilValue(annotationState);
  const annotationRefs = useRef<Array<HTMLDivElement | null>>([]);
  const { id } = useParams() as { id: string };

  const { data: story } = useStory(id);
  const updateStoryMutation = useUpdateStory(id);
  const [isMutatingParticipant, setIsMutatingParticipant] = useState(false);
  const handleStoryParticipants = (participant: Persons) => {
    updateStoryMutation.mutate({
      id,
      storiesParticipantsId: participant.id,
      _version: story?._version,
    });
  };
  const updateParticipantMutation = useUpdatePerson();
  const createParticipantMutation = useCreatePerson(handleStoryParticipants);
  const handleDocumentChange = useCallback(
    async (id, body) => {
      if (body) {
        updateStoryMutation.mutate({
          id,
          content: body,
          _version: story?._version,
        });
      }
    },
    [story?._version, updateStoryMutation]
  );
  const handleTitleChange = useDebouncedCallback((id, title) => {
    if (story) {
      updateStoryMutation.mutate({
        id,
        title,
        _version: story._version,
      });
    }
  }, 500);

  const positionDictionary = useMemo(
    () =>
      (Object.keys(annotation) as string[]).reduce<{
        [key: string]: number | undefined;
      }>((dict, id: string) => {
        const element = document.getElementById(id);
        const top = element?.getBoundingClientRect().top;
        dict[id] = top;
        return dict;
      }, {}),
    [annotation]
  );
  const updatePositions = () => {
    (Object.keys(annotation) as string[]).forEach((id: string, index) => {
      const element = document.getElementById(id);
      const top = element?.getBoundingClientRect().top;
      const highlight = annotationRefs.current[index];
      if (highlight && top) {
        highlight.style.top = top + "px";
      }
    });
  };

  const participant = story?.participants;
  const storyMetadata = story
    ? {
        id: story.id,
        projectId: story.projectsID,
      }
    : null;
  const handleMetadataChange = async (
    properties: MetaProperty[]
  ): Promise<void> => {
    const participantDetails = properties.reduce(
      (person: any, property: MetaProperty) => {
        if (property.label)
          person[property.label.toLowerCase()] = property.selectedOptions
            ? property.selectedOptions
            : property.value;
        return person;
      },
      {}
    );

    if (story) {
      if (participant) {
        updateParticipantMutation.mutate({
          id: participant.id,
          name: participantDetails.name,
          email: participantDetails.email,
          business: JSON.stringify(participantDetails.company),
          persona: participantDetails.persona,
          _version: participant._version,
        });
      } else {
        createParticipantMutation.mutate({
          name: participantDetails.name,
          email: participantDetails.email,
          business: JSON.stringify(participantDetails.company),
          persona: participantDetails.persona,
        });
      }
    }
    // handleDocumentChange(id, {
    //   ...story,
    //   Persons: participant as ModelInit<Participant>,
    // });
  };

  return story ? (
    <StoryMetadataProvider value={storyMetadata}>
      <EuiPageContentBody
        className="eui-yScroll"
        onScroll={() => updatePositions()}
        paddingSize="none"
      >
        <EuiFlexGroup
          justifyContent="spaceAround"
          style={{ width: 900, margin: "0 auto" }}
        >
          <EuiFlexItem>
            <EuiFlexGroup direction="column">
              <EuiFlexItem grow={false}>
                <EuiFlexGroup justifyContent="center">
                  <EuiFlexItem>
                    <span
                      className="euiTitle--large"
                      contentEditable
                      onInput={(e: any) => {
                        handleTitleChange(id, e.target.innerText);
                      }}
                    >
                      {story?.title}
                    </span>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFlexItem>
              <hr />
              <EuiFlexItem grow={false}>
                <EuiFlexGroup justifyContent="center">
                  {story && (
                    <EuiFlexItem>
                      <PropertiesEditor
                        properties={
                          [
                            {
                              label: "Name",
                              type: FIELD_TYPES.TEXT,
                              value: participant?.name,
                            },
                            {
                              label: "Email",
                              type: FIELD_TYPES.EMAIL,
                              value: participant?.email,
                            },
                            {
                              label: "Company",
                              type: FIELD_TYPES.COMPANY,
                              selectedOptions: participant?.business,
                            },
                            {
                              label: "Persona",
                              type: FIELD_TYPES.TEXT,
                              value: participant?.persona,
                            },
                          ] as MetaProperty[]
                        }
                        onChange={handleMetadataChange}
                      />
                    </EuiFlexItem>
                  )}
                </EuiFlexGroup>
              </EuiFlexItem>
              <hr />
              <EuiFlexItem
                style={{
                  minHeight: 400,
                  margin: "12px 0",
                }}
              >
                <EuiFlexGroup gutterSize="none">
                  <EuiFlexItem>
                    <Editor
                      onSave={handleDocumentChange}
                      documentId={id}
                      content={story.content || DefaultStoryDocument}
                      provider={provider}
                    />
                  </EuiFlexItem>
                  <EuiFlexItem grow={false}></EuiFlexItem>
                </EuiFlexGroup>
              </EuiFlexItem>
              <hr />
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            {Object.keys(annotation).map((id, index) => {
              return (
                <div
                  ref={(el) => (annotationRefs.current[index] = el)}
                  key={id}
                  style={{
                    position: "fixed",
                    top: positionDictionary[id] + "px",
                  }}
                >
                  {annotation[id].tags.map((tag, index) => (
                    <>
                      <EuiBetaBadge
                        label={tag.label}
                        size="m"
                        key={id + index}
                        color="hollow"
                      />{" "}
                      &nbsp;
                    </>
                  ))}
                </div>
              );
            })}
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageContentBody>
    </StoryMetadataProvider>
  ) : null;
  // );
};
