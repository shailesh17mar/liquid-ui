import {
  EuiBetaBadge,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPageContentBody,
  EuiTitle,
} from "@elastic/eui";
import { PropertiesEditor } from "../shared/components/property-editor/property-editor";
import { Editor } from "../shared/components/editor/editor";
import { data } from "presentation/modules/shared/components/transcript/dummy";
import { annotationState } from "main/pages/make-story-details-page";
import { useRecoilValue } from "recoil";
import { useCallback, useMemo, useRef } from "react";
import { JSONContent } from "@tiptap/react";
import { matchPath, useParams } from "react-router-dom";
import { StoryMutationController } from "core/modules/stories/usecases/story-mutation-controller";
import { StoriesQueryController } from "core/modules/stories/usecases/story-query-controller";
import { useQuery, useQueryClient } from "react-query";
import { WebrtcProvider } from "y-webrtc";
import { Doc } from "yjs";

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
  mutationController: StoryMutationController;
  queryController: StoriesQueryController;
}

const route = matchPath("/stories/:id", window.location.pathname);
const id = route?.params.id;
const doc = new Doc({ guid: id });
const provider = new WebrtcProvider(`liquid-${id}`, doc);

export const StoryDetails: React.FC<Props> = ({
  queryController,
  mutationController,
}) => {
  const queryClient = useQueryClient();
  const { id } = useParams() as { id: string };
  const { data: story, isLoading } = useQuery(
    `projects-details-${id}`,
    async () => {
      return await queryController.getById(id);
    }
  );
  const handleSave = useCallback(
    async (id, body) => {
      if (body) {
        // await mutationController.updateStory(id, { content: body });
        queryClient.invalidateQueries([`liquid`, id]);
      }
    },
    [mutationController, queryClient]
  );
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
      console.log(top);
      if (highlight && top) {
        highlight.style.top = top + "px";
      }
    });
  };

  return (
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
                  <EuiTitle size="l">
                    <h1>Interview with Shailesh</h1>
                  </EuiTitle>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
            <hr />
            <EuiFlexItem grow={false}>
              <EuiFlexGroup justifyContent="center">
                <EuiFlexItem>
                  <PropertiesEditor />
                </EuiFlexItem>
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
                    content={DefaultStoryDocument}
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
  );
};
