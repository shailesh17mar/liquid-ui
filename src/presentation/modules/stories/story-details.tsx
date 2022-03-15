import {
  EuiBadge,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPageContentBody,
} from "@elastic/eui";
import { PropertiesEditor } from "../shared/components/editor/components/property-editor/property-editor";
import { Editor } from "../shared/components/editor/editor";
import {
  Annotation,
  annotationState,
} from "main/pages/make-story-details-page";
import { useRecoilState, useRecoilValue } from "recoil";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { JSONContent } from "@tiptap/react";
import { useParams } from "react-router-dom";
import { Doc } from "yjs";
import {
  FIELD_TYPES,
  MetaProperty,
} from "../shared/components/editor/components/property-editor/types";
import { HighlightType, Persons as Participant, Persons } from "models";
import { ModelInit } from "@aws-amplify/datastore";
import { useDebouncedCallback } from "use-debounce";
import { StoryMetadataProvider } from "./story-context";
import { useStory, useUpdateStory } from "core/modules/stories/hooks";
import {
  useCreatePerson,
  useUpdatePerson,
} from "core/modules/participants/hooks";
import { StoryDocument, TagAnnotation } from "./story.styles";
import { ContentLoader } from "../shared/components/content-loader/content-loader";
import { HocuspocusProvider } from "@hocuspocus/provider";
import _ from "lodash";
import {
  useHighlights,
  useUpdateHighlight,
} from "core/modules/highlights/hooks";
import { useTags } from "core/modules/tags/hooks";
import {
  highlightAtom,
  HighlightState,
} from "../shared/components/editor/components/highlight-control/tag-manager";
import {
  HIGHLIGHT_COLORS,
  HIGHLIGHT_TYPES,
} from "../shared/components/editor/components/highlight-control/color-picker";

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
// var provider: ;

const doc = new Doc();
// export const syncType = doc.getXmlFragment("prosemirror");
export const StoryDetails: React.FC = () => {
  const [isSynced, setIsSynced] = useState(false);
  const [annotation, setAnnotation] = useRecoilState(annotationState);
  const [highlightState, setHighlightState] = useRecoilState(highlightAtom);
  const updateHighlightMutation = useUpdateHighlight();
  const annotationRefs = useRef<Array<HTMLDivElement | null>>([]);
  const { id } = useParams() as { id: string };
  const [isInit, setIsInit] = useState(false);

  const { data: story } = useStory(id);
  const updateStoryMutation = useUpdateStory();
  const [isMutatingParticipant, setIsMutatingParticipant] = useState(false);

  const { data: tags } = useTags(story?.projectsID, Boolean(story?.projectsID));
  const { data: highlights } = useHighlights({
    storyId: id,
  });
  const getColor = (color: string) =>
    Object.keys(HIGHLIGHT_TYPES).find(
      (highlightType) =>
        HIGHLIGHT_TYPES[highlightType as HIGHLIGHT_COLORS].color === color
    )!!;

  useEffect(() => {
    if (
      !isInit &&
      tags &&
      tags.length > 0 &&
      highlights &&
      highlights.length > 0
    ) {
      const annotation = highlights.reduce<Annotation>((acc, highlight) => {
        const tagIds = highlight.Tags || [];
        const selectedTags = tags.filter((tag) => tagIds.includes(tag.id));

        const uniqueColors = new Set(
          selectedTags.map((option) => option.color)
        );

        const color =
          uniqueColors.size > 1
            ? HIGHLIGHT_COLORS.MIXED
            : (Array.from(uniqueColors)[0] as HIGHLIGHT_COLORS);
        const annotationTags = selectedTags.map((tag) => {
          return {
            label: tag.label,
            id: tag.id,
            color:
              HIGHLIGHT_TYPES[
                (tag.tagCategory.color || tag.color) as HIGHLIGHT_COLORS
              ].color,
          };
        });
        acc[highlight.id] = {
          type: color || "default",
          tags: annotationTags,
        };
        return acc;
      }, {});
      setAnnotation((existingAnnotation) => {
        return {
          ...annotation,
          ...existingAnnotation,
        };
      });
      setIsInit(true);
    }
  }, [highlights, isInit, setAnnotation, tags]);

  const provider = useMemo(() => {
    return new HocuspocusProvider({
      url: process.env.REACT_APP_COLLAB_ENGINE || "ws://localhost:5000",
      name: `story-${id}`,
      token: "token",
    });
  }, []);

  useEffect(() => {
    updatePositions();
  }, [annotation]);
  useEffect(() => {
    provider.on("sync", (synced: boolean) => {
      if (!isSynced && synced) {
        setIsSynced(true);
      }
    });
  }, [isSynced, provider]);

  const handleStoryParticipants = (participant: Persons) => {
    updateStoryMutation.mutate({
      id,
      storiesParticipantsId: participant.id,
    });
  };
  const updateParticipantMutation = useUpdatePerson();
  const createParticipantMutation = useCreatePerson(handleStoryParticipants);
  const handleDocumentChange = useCallback(
    async (id, body) => {
      if (body) {
        // updateStoryMutation.mutate({
        //   id,
        //   content: body,
        // });
      }
    },
    [updateStoryMutation]
  );
  const handleTitleChange = useDebouncedCallback(async (id, title) => {
    if (story) {
      const updatedStory = await updateStoryMutation.mutateAsync({
        id,
        title,
      });
    }
  }, 500);

  const updateHighlight = useDebouncedCallback(
    async (id: string, text: string) => {
      updateHighlightMutation.mutateAsync({
        id,
        text,
      });
    },
    1000
  );

  useMemo(
    () =>
      (Object.keys(annotation) as string[]).reduce<{
        [key: string]: number | undefined;
      }>((dict, id: string) => {
        const element = document.querySelector(`span[data-hid="${id}"]`);
        const top = element?.getBoundingClientRect().top;
        element?.addEventListener("DOMSubtreeModified", (e) =>
          updateHighlight(id, e.target as unknown as string)
        );
        dict[id] = top;
        return dict;
      }, {}),
    [annotation, annotationRefs.current?.length]
  );
  const updatePositions = () => {
    (Object.keys(annotation) as string[]).forEach((id: string, index) => {
      const element = document.querySelector(`span[data-hid="${id}"]`);
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

  const handleMetadataChange = useDebouncedCallback(
    async (properties: MetaProperty[]): Promise<void> => {
      const participantDetails = properties.reduce(
        (person: any, property: MetaProperty) => {
          if (property.label) {
            const isNativeProperty = [
              "name",
              "email",
              "company",
              "persona",
            ].includes(property.label.toLowerCase());
            const label = isNativeProperty
              ? property.label.toLowerCase()
              : property.label;
            const value = property.selectedOptions
              ? property.selectedOptions
              : property.value;
            person[label] = isNativeProperty ? value : property;
          }
          return person;
        },
        {}
      );

      if (story) {
        const { name, email, company, persona, ...additionalFields } =
          participantDetails;
        if (participant) {
          updateParticipantMutation.mutate({
            id: participant.id,
            name,
            email,
            business: JSON.stringify(company),
            persona,
            additonalFields: JSON.stringify(additionalFields),
          });
        } else {
          createParticipantMutation.mutate({
            name,
            email,
            business: JSON.stringify(company),
            additonalFields: JSON.stringify(additionalFields),
            persona,
          });
        }
      }
      handleDocumentChange(id, {
        ...story,
        Persons: participant as ModelInit<Participant>,
      });
    },
    2000
  );

  const StoryEditor = useMemo(
    () =>
      provider && (
        <Editor
          withHighlighting
          onSave={handleDocumentChange}
          documentId={id}
          provider={provider}
        />
      ),
    [handleDocumentChange, id, provider]
  );

  const storyProperties = [
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
  ].concat(
    //@ts-ignore
    participant && participant.additonalFields
      ? //@ts-ignore
        Object.keys(participant.additonalFields).map((key: any) => {
          //@ts-ignore
          const property = participant.additonalFields[key];
          return property as unknown as MetaProperty;
        })
      : []
  ) as MetaProperty[];
  return (
    <StoryMetadataProvider value={storyMetadata}>
      <StoryDocument
        className="eui-yScroll"
        onScroll={() => updatePositions()}
        paddingSize="none"
        annotation={annotation}
      >
        <EuiFlexGroup
          justifyContent="spaceAround"
          style={{ width: 900, margin: "0 auto" }}
        >
          {story && isSynced ? (
            <>
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
                          suppressContentEditableWarning
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
                            properties={storyProperties}
                            onChange={handleMetadataChange}
                          />
                        </EuiFlexItem>
                      )}
                    </EuiFlexGroup>
                  </EuiFlexItem>
                  <hr />
                  <EuiFlexItem
                    style={{
                      margin: "12px 0",
                    }}
                  >
                    <EuiFlexGroup gutterSize="none">
                      <EuiFlexItem>{StoryEditor}</EuiFlexItem>
                      <EuiFlexItem grow={false}></EuiFlexItem>
                    </EuiFlexGroup>
                  </EuiFlexItem>
                  <hr />
                </EuiFlexGroup>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                {Object.keys(annotation).map((id, index) => {
                  return (
                    <TagAnnotation
                      ref={(el) => (annotationRefs.current[index] = el)}
                      key={id}
                      type={annotation[id].type}
                      // top={positionDictionary[id]}
                    >
                      {annotation[id].tags.map((tag, index) => (
                        <EuiBadge
                          key={id + index}
                          color={tag.color || "default"}
                        >
                          {tag.label}{" "}
                        </EuiBadge>
                      ))}
                    </TagAnnotation>
                  );
                })}
              </EuiFlexItem>
            </>
          ) : (
            <ContentLoader />
          )}
        </EuiFlexGroup>
      </StoryDocument>
    </StoryMetadataProvider>
  );
  // );
};
