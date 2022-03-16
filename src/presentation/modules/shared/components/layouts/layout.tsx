import React, { useState } from "react";
import { euiPaletteColorBlind, EuiBreadcrumbs, EuiIcon } from "@elastic/eui";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Page } from "./layout.styles";
import { useAuth } from "presentation/context/auth-context";
import { CreateProjectModal } from "../create-project-modal/create-project-modal";
import { SideBar } from "./sidebar";
import { UserMenu } from "./components/user-menu";
import { ActionMenu } from "./components/action-menu";
import { useProjects } from "core/modules/projects/hooks";
import { useStory } from "core/modules/stories/hooks";
import { useCategory } from "core/modules/categories/hooks";
import { useTracking } from "main/use-tracking";
import { CgReadme } from "react-icons/cg";
import { BsTags } from "react-icons/bs";
import { AiOutlineHighlight } from "react-icons/ai";
import { IoIosAnalytics } from "react-icons/io";
import { FiHome, FiDatabase } from "react-icons/fi";

const palette = euiPaletteColorBlind({ direction: "both", order: "append" });
const makeBreadcrumbs = (navigate: (path: string) => void, story: any) => [
  {
    text: (
      <>
        <EuiIcon type="folderOpen" style={{ marginRight: 5 }} />
        {story?.projectName}
      </>
    ),

    onClick: () => {
      navigate(`/projects/${story?.projectsID}/stories`);
    },
  },
  {
    text: story.categoryName,
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
    icon: CgReadme,
    path: `/projects/${id}`,
    route: "/projects/:id",
    color: palette[0],
  },
  {
    label: "Data",
    icon: FiDatabase,
    filled: false,
    path: `/projects/${id}/stories`,
    route: ["/stories/:id", "/projects/:id/stories"],
    color: palette[1],
  },
  {
    label: "Highlights",
    icon: AiOutlineHighlight,
    path: `/projects/${id}/highlights`,
    route: "/projects/:id/highlights",
    color: palette[2],
  },
  {
    label: "Tags",
    icon: BsTags,
    path: `/projects/${id}/tags`,
    route: "/projects/:id/tags",
    color: palette[3],
  },
  {
    label: "Insights",
    icon: IoIosAnalytics,
    path: `/projects/${id}/insights`,
    route: "/projects/:id/insights",
    color: palette[4],
  },
];
const MainNavItems = [
  {
    label: "Home",
    isIndex: true,
    icon: FiHome,
    path: "/",
    route: "/",
    color: "rgb(252, 180, 21)",
  },
  // {
  //   label: "Find",
  //   icon: "search",
  //   path: "/find",
  //   route: "/find",
  //   color: "#a21a68",
  // },
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
  useTracking();

  const { data: projects } = useProjects();
  const { data: story } = useStory(id || "", Boolean(isStoryPage));
  const { data: category } = useCategory(
    story?.categoriesID || "",
    Boolean(story)
  );
  const currentProject =
    isStoryPage && story
      ? projects?.filter((project) => project.id === story?.projectsID)[0]
      : isProjectLayout
      ? projects?.filter((project) => project.id === id)[0]
      : undefined;
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
    navigate(`/projects/${id}/stories`);
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
        rightSideItems: [
          <UserMenu />,
          // <EuiButton fill color="warning">
          //   Upgrade
          // </EuiButton>,
          <ActionMenu onAddProject={handleAddProject} />,
          // <EuiFieldSearch
          //   placeholder="Search for anything"
          //   fullWidth
          //   isClearable
          // />,
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
            projectName: currentProject?.name,
          })}
          truncate={false}
          aria-label="An example of EuiBreadcrumbs"
        />
      ) : null}
      <Outlet />
    </Page>
  ) : null;
};
