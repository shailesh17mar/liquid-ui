import React, { useState } from "react";
import {
  EuiFieldSearch,
  EuiButton,
  euiPaletteColorBlind,
  EuiBreadcrumbs,
  EuiLink,
  EuiButtonEmpty,
} from "@elastic/eui";
import { Navigate, Outlet, useNavigate, useParams } from "react-router-dom";
import { Page } from "./layout.styles";
import { useAuth } from "presentation/context/auth-context";
import { CreateProjectModal } from "../create-project-modal/create-project-modal";
import { SideBar } from "./sidebar";
import { UserMenu } from "./components/user-menu";
import { ActionMenu } from "./components/action-menu";
import { useProjects } from "core/modules/projects/hooks";
import { useStory } from "core/modules/stories/hooks";
import { Stories } from "models";
import { useCategory } from "core/modules/categories/hooks";

const palette = euiPaletteColorBlind({ direction: "both", order: "append" });
const makeBreadcrumbs = (navigate: (path: string) => void, story: any) => [
  {
    text: "Stories",
    onClick: () => {
      navigate(`/projects/${story?.projectsID}/stories`);
    },
  },
  {
    text: (
      <EuiButtonEmpty color="text" iconType="layers">
        {story.categoryName}
      </EuiButtonEmpty>
    ),
    onClick: () => {
      navigate(`/projects/${story?.projectsID}/stories`);
    },
  },
  {
    text: story?.title,
    color: "primary",
    onClick: (e: any) => {
      e.preventDefault();
    },
  },
];
const makeProjectNavItems = (id: string = "") => [
  {
    label: "About",
    icon: "documentation",
    path: `/projects/${id}`,
    route: "/projects/:id",
    color: palette[0],
  },
  {
    label: "Stories",
    icon: "tableOfContents",
    path: `/projects/${id}/stories`,
    route: ["/stories/:id", "/projects/:id/stories"],
    color: palette[1],
  },
  {
    label: "Highlights",
    icon: "documentEdit",
    path: `/projects/${id}/highlights`,
    route: "/projects/:id/highlights",
    color: palette[2],
  },
  {
    label: "Tags",
    icon: "tag",
    path: `/projects/${id}/tags`,
    route: "/projects/:id/tags",
    color: palette[3],
  },
  {
    label: "Insights",
    icon: "visPie",
    path: `/projects/${id}/insights`,
    route: "/projects/:id/insights",
    color: palette[4],
  },
];
const MainNavItems = [
  {
    label: "Home",
    isIndex: true,
    icon: "home",
    path: "/",
    route: "/",
    color: "rgb(252, 180, 21)",
  },
  {
    label: "Find",
    icon: "search",
    path: "/find",
    route: "/find",
    color: "#a21a68",
  },
];
interface Props {
  isProjectLayout?: boolean;
  isStoryPage?: boolean;
}
export const Layout: React.FC<Props> = ({ isProjectLayout, isStoryPage }) => {
  const { id } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: projects } = useProjects();
  const { data: story } = useStory(id || "", Boolean(isStoryPage));
  const { data: category } = useCategory(
    story?.categoriesID || "",
    Boolean(story)
  );
  const navItems = isProjectLayout
    ? isStoryPage
      ? makeProjectNavItems(story?.projectsID)
      : makeProjectNavItems(id)
    : MainNavItems;

  const handleAddProject = () => {
    setIsModalVisible(true);
  };

  const handleAddProjectSuccess = (id: string) => {
    setIsModalVisible(false);
    navigate(`/projects/${id}`);
  };

  return user ? (
    <Page
      fullHeight
      paddingSize="none"
      restrictWidth={false}
      pageContentProps={{
        paddingSize: "m",
        hasBorder: true,
        hasShadow: false,
      }}
      pageBodyProps={{
        panelProps: {
          hasShadow: false,
          hasBorder: true,
        },
      }}
      pageHeader={{
        iconType: "logoElastic",
        paddingSize: "m",
        description: (
          <EuiFieldSearch
            placeholder="Search for anything"
            fullWidth
            isClearable
          />
        ),
        rightSideItems: [
          <UserMenu />,
          <EuiButton fill color="warning">
            Upgrade
          </EuiButton>,
          <ActionMenu onAddProject={handleAddProject} />,
        ],
      }}
      pageSideBar={
        <SideBar
          hasProjects={!isProjectLayout}
          items={navItems}
          projects={projects}
        />
      }
    >
      {isModalVisible && (
        <CreateProjectModal
          onClose={() => setIsModalVisible(false)}
          onConfirm={handleAddProjectSuccess}
        />
      )}
      {isStoryPage && story && category ? (
        <EuiBreadcrumbs
          breadcrumbs={makeBreadcrumbs(navigate, {
            ...story,
            categoryName: category.name,
          })}
          truncate={false}
          aria-label="An example of EuiBreadcrumbs"
        />
      ) : null}
      <Outlet />
    </Page>
  ) : null;
};
