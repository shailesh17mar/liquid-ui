import {
  EuiBetaBadge,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPageContentBody,
  EuiTitle,
} from "@elastic/eui";
import { PropertiesEditor } from "../shared/components/editor/components/property-editor/property-editor";
import { Editor } from "../shared/components/editor/editor";
import { annotationState } from "main/pages/make-story-details-page";
import { useRecoilValue } from "recoil";
import { useCallback, useMemo, useRef } from "react";
import { JSONContent } from "@tiptap/react";
import { matchPath, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
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
import { Persons as Participant, Stories as Story } from "models";
import { ModelInit } from "@aws-amplify/datastore";
import { useDebouncedCallback } from "use-debounce/lib";

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
interface Props {
  participantController: ParticipantController;
  storyController: StoryController;
}

const route = matchPath("/stories/:id", window.location.pathname);
const id = route?.params.id;
const doc = new Doc({ guid: id });
const provider = new WebrtcProvider(`story-${id}`, doc);

export const StoryDetails: React.FC<Props> = ({
  participantController,
  storyController,
}) => {
  const queryClient = useQueryClient();
  const { id } = useParams() as { id: string };
  const { data: story } = useQuery(["story-details", id], async () => {
    return await storyController.getStoryById(id);
  });
  //person is embedded
  const handleSave = useCallback(
    async (id, body) => {
      if (body) {
        await storyController.updateStory(id, { ...story, content: body });
        console.log("updated");
        queryClient.invalidateQueries(["story-details", id]);
      }
    },
    [queryClient, story, storyController]
  );
  const handleSaveDebounced = useDebouncedCallback(async (id, patch) => {
    await storyController.updateStory(id, { ...story, ...patch });
    queryClient.invalidateQueries(["story-details", id]);
  }, 500);
  const annotation = useRecoilValue(annotationState);
  const annotationRefs = useRef<Array<HTMLDivElement | null>>([]);
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
  return story ? (
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
                      handleSaveDebounced(id, { title: e.target.innerHTML });
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
                            selectedOptions: participant?.business || [],
                          },
                          {
                            label: "Persona",
                            type: FIELD_TYPES.TEXT,
                            value: participant?.persona,
                          },
                        ] as MetaProperty[]
                      }
                      onChange={async (properties) => {
                        const participantDetails = properties.reduce(
                          (person: any, property: MetaProperty) => {
                            if (property.label)
                              person[property.label.toLowerCase()] =
                                property.selectedOptions
                                  ? property.selectedOptions
                                  : property.value;
                            return person;
                          },
                          {}
                        );

                        if (story) {
                          if (participant) {
                            const updatedParticipant =
                              await participantController.updateParticipant(
                                participant.id,
                                {
                                  name: participantDetails.name,
                                  email: participantDetails.email,
                                  business: JSON.stringify(
                                    participantDetails.company
                                  ),
                                  persona: participantDetails.persona,
                                }
                              );
                            const result2 = await storyController.updateStory(
                              id,
                              {
                                ...story,
                                participants: updatedParticipant,
                              }
                            );
                          } else {
                            const newParticipant =
                              await participantController.createParticipant(
                                new Participant({
                                  name: participantDetails.name,
                                  email: participantDetails.email,
                                  business: JSON.stringify(
                                    participantDetails.company
                                  ),
                                  persona: participantDetails.persona,
                                })
                                // participantDetails as ModelInit<Participant>
                              );

                            const result = await storyController.updateStory(
                              id,
                              {
                                ...story,
                                participants: newParticipant,
                              }
                            );
                          }
                          queryClient.invalidateQueries(["story-details", id]);
                        }
                        // handleSave(id, {
                        //   ...story,
                        //   Persons: participant as ModelInit<Participant>,
                        // });
                        console.log(participant);
                      }}
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
                    onSave={handleSave}
                    documentId={id}
                    content={story?.content || DefaultStoryDocument}
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
  ) : null;
  // );
};
