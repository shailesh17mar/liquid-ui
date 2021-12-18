import React, { useState } from "react";
import {
  EuiPageTemplate,
  EuiContextMenuItem,
  EuiPopover,
  useGeneratedHtmlId,
  EuiFieldSearch,
  EuiButton,
  EuiContextMenuPanel,
  euiPaletteColorBlind,
} from "@elastic/eui";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { HeaderActionButton, Page } from "./layout.styles";
import { makeProjectQueryController } from "main/factories/project-factory";
import { useQuery } from "react-query";
import { useAuth } from "presentation/context/auth-context";
import { CreateProjectModal } from "../create-project-modal/create-project-modal";
import { SideBar } from "./sidebar";
import { UserMenu } from "./components/user-menu";
import { ActionMenu } from "./components/action-menu";

interface Props {
  isProjectLayout?: boolean;
}

const palette = euiPaletteColorBlind({ direction: "both", order: "append" });
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
    path: "stories",
    route: ["/stories/:id", "/projects/:id/stories"],
    color: palette[1],
  },
  {
    label: "Highlights",
    icon: "documentEdit",
    path: "highlights",
    route: "/projects/:id/highlights",
    color: palette[2],
  },
  {
    label: "Tags",
    icon: "tag",
    path: "tags",
    route: "/projects/:id/tags",
    color: palette[3],
  },
  {
    label: "Insights",
    icon: "visPie",
    path: "insights",
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
export const Layout: React.FC<Props> = ({ isProjectLayout }) => {
  const { id } = useParams();
  const navItems = isProjectLayout ? makeProjectNavItems(id) : MainNavItems;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const controller = makeProjectQueryController();
  const { data: projects } = useQuery("projects", async () => {
    return await controller.getAll();
  });

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
      <Outlet />
    </Page>
  ) : null;
};
