import { EuiFlexGroup, EuiFlexItem, EuiTitle } from "@elastic/eui";
import { PropertiesEditor } from "../shared/components/property-editor/property-editor";
import { Editor } from "../shared/components/editor/editor";
import { data } from "presentation/modules/shared/components/transcript/dummy";

const DefaultStoryDocument = `
          <h1>
            It’ll always have a heading
          </h1>
          <p>
            We're a remote company since Day 1. As the team grows, it's vital to learn from our experiments. Slite is the tool we use to do so. It helps us keep in-sync. It helps us grow. Slack/Google Docs just weren’t cutting it for knowledge preservation. The thing that shocked me the most is how teammates have ambient exposure to shared knowledge, without them being notified, or having to search for it. We're a remote company since Day 1. As the team grows, it's vital to learn from our experiments. Slite is the tool we use to do so. It helps us keep in-sync. It helps us grow.
          </p>
          <p>
          It took us forever to find the right tool for our company, we tried Evernote, Notion, Google docs, Confluence. But in one way or another, they didn’t work for us. When we tried Slite, we found something that worked great, simple, focused but also flexible. I implemented Slite at our office as a knowledge base for all of our processes and everyone has LOVED it. We now use it for all of our client meeting minutes, as personal notebooks, and training/reference material. It is amazing to have one workspace where we have all documentation from employee onboarding to guides and even technical documentation. I love how it structures documentations and you can find any information from all docs in the workspace.
          </p>
          <transcript>
          ${data}
          </transcript>
          
        `;
export const StoryDetails: React.FC = () => {
  return (
    <EuiFlexGroup
      style={{ width: 900, margin: "0 auto" }}
      justifyContent="spaceAround"
      direction="column"
    >
      <EuiFlexItem>
        <EuiFlexGroup justifyContent="center">
          <EuiFlexItem>
            <EuiTitle size="l">
              <h1>Interview with Shailesh</h1>
            </EuiTitle>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
      <hr />
      <EuiFlexItem>
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
            <Editor content={DefaultStoryDocument} />
          </EuiFlexItem>
          <EuiFlexItem grow={false}></EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
      <hr />
    </EuiFlexGroup>
  );
};
