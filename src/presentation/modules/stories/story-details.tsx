import {
  EuiBadge,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPageContentBody,
} from "@elastic/eui";
import { PropertiesEditor } from "../shared/components/editor/components/property-editor/property-editor";
import { Editor } from "../shared/components/editor/editor";
import { annotationState } from "main/pages/make-story-details-page";
import { useRecoilValue } from "recoil";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { JSONContent } from "@tiptap/react";
import { useParams } from "react-router-dom";
import { Doc } from "yjs";
import {
  FIELD_TYPES,
  MetaProperty,
} from "../shared/components/editor/components/property-editor/types";
import { Persons as Participant, Persons } from "models";
import { ModelInit } from "@aws-amplify/datastore";
import { useDebouncedCallback } from "use-debounce";
import { StoryMetadataProvider } from "./story-context";
import { useStory, useUpdateStory } from "core/modules/stories/hooks";
import {
  useCreatePerson,
  useUpdatePerson,
} from "core/modules/participants/hooks";
import { TagAnnotation } from "./story.styles";
import { ContentLoader } from "../shared/components/content-loader/content-loader";
import { HocuspocusProvider } from "@hocuspocus/provider";

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
  const annotation = useRecoilValue(annotationState);
  const annotationRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [version, setVersion] = useState<number>(-1);
  const { id } = useParams() as { id: string };

  const { data: story } = useStory(id);
  const updateStoryMutation = useUpdateStory();
  const [isMutatingParticipant, setIsMutatingParticipant] = useState(false);

  const provider = useMemo(() => {
    return new HocuspocusProvider({
      url: process.env.REACT_APP_COLLAB_ENGINE || "ws://localhost:5000",
      name: `story-${id}`,
      token: "token",
    });
  }, []);

  useEffect(() => {
    //@ts-ignore
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
      _version: story?._version,
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
        //   _version: story?._version,
        // });
      }
    },
    [story?._version, updateStoryMutation]
  );
  const handleTitleChange = useDebouncedCallback(async (id, title) => {
    if (story) {
      const updatedStory = await updateStoryMutation.mutateAsync({
        id,
        title,
        _version: version < 0 ? story._version : version,
      });
      if (updatedStory) {
        setVersion(updatedStory._version);
      }
    }
  }, 500);

  const positionDictionary = useMemo(
    () =>
      (Object.keys(annotation) as string[]).reduce<{
        [key: string]: number | undefined;
      }>((dict, id: string) => {
        const element = document.querySelector(`span[data-hid="${id}"]`);
        const top = element?.getBoundingClientRect().top;
        dict[id] = top;
        return dict;
      }, {}),
    [annotation]
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
            _version: participant._version,
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
    500
  );

  const StoryEditor = useMemo(
    () =>
      provider && (
        <Editor
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
      <EuiPageContentBody
        className="eui-yScroll"
        onScroll={() => updatePositions()}
        paddingSize="none"
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
                      minHeight: 400,
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
                      top={positionDictionary[id]}
                    >
                      {annotation[id].tags.map((tag, index) => (
                        <EuiBadge key={id + index} color="default">
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
      </EuiPageContentBody>
    </StoryMetadataProvider>
  );
  // );
};
