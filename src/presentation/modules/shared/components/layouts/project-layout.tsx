import React, { useState } from "react";
import "@elastic/eui/dist/eui_theme_light.css";
import {
  EuiIcon,
  EuiPageSideBar,
  EuiPageTemplate,
  EuiSideNav,
  slugify,
  EuiAvatar,
  EuiContextMenuPanel,
  EuiContextMenuItem,
  EuiPopover,
  useGeneratedHtmlId,
  EuiButtonEmpty,
  EuiFieldSearch,
  euiPaletteColorBlind,
  EuiPageContentBody,
} from "@elastic/eui";
import {
  Link,
  matchPath,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

export const ProjectLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSideNavOpenOnMobile, setIsSideNavOpenOnMobile] =
    useState<boolean>(false);
  const [isPopoverOpen, setPopover] = useState<boolean>(false);
  const [selectedItemName, setSelectedItem] = useState("Time stuff");
  const singleContextMenuPopoverId = useGeneratedHtmlId({
    prefix: "singleContextMenuPopover",
  });
  const onButtonClick = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };

  const toggleOpenOnMobile = () => {
    setIsSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  const selectItem = (name: string) => {
    setSelectedItem(name);
  };

  const createItem = (name: string, data: any = {}, to: string = "") => {
    // NOTE: Duplicate `name` values will cause `id` collisions.
    const match = matchPath(`/projects/:id/${to}`, location.pathname);
    return {
      id: slugify(name),
      name,
      isSelected: selectedItemName === name || Boolean(match),
      onClick: () => {
        selectItem(name);
        if (to) navigate(to);
      },
      ...data,
    };
  };

  const items = [
    <EuiContextMenuItem key="copy" onClick={closePopover}>
      Profile
    </EuiContextMenuItem>,
    <EuiContextMenuItem key="edit" onClick={closePopover}>
      Settings
    </EuiContextMenuItem>,
    <EuiContextMenuItem key="share" onClick={closePopover}>
      Logout
    </EuiContextMenuItem>,
  ];
  const palette = euiPaletteColorBlind({ direction: "both", order: "append" });
  const sideNav = [
    createItem("Project 1", {
      items: [
        createItem(
          "Stories",
          {
            icon: <EuiIcon color={palette[0]} type="tableOfContents" />,
          },
          "stories"
        ),
        createItem(
          "Highlights",
          {
            icon: <EuiIcon type="documentEdit" color={palette[1]} />,
          },
          "highlights"
        ),
        createItem(
          "Tags",
          {
            icon: <EuiIcon color={palette[2]} type="tag" />,
          },
          "tags"
        ),
        createItem(
          "Insights",
          {
            icon: <EuiIcon color={palette[3]} type="visPie" />,
          },
          "insights"
        ),
      ],
    }),
  ];

  const breadcrumbs = [
    {
      text: "Management",
      href: "#",
    },
    {
      text: "Users",
    },
  ];
  const button = (
    <EuiButtonEmpty onClick={onButtonClick}>
      <EuiAvatar name="Shailesh Kumar"></EuiAvatar>
    </EuiButtonEmpty>
  );
  return (
    <EuiPageTemplate
      fullHeight
      restrictWidth={false}
      paddingSize="none"
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
          <EuiPopover
            id={singleContextMenuPopoverId}
            button={button}
            isOpen={isPopoverOpen}
            closePopover={closePopover}
            panelPaddingSize="none"
            anchorPosition="downLeft"
          >
            <EuiContextMenuPanel size="m" items={items} />
          </EuiPopover>,
        ],
      }}
      pageContentProps={{ paddingSize: "none" }}
      pageSideBar={
        <EuiPageSideBar paddingSize="m">
          <EuiSideNav
            aria-label="Basic example"
            heading={
              <Link to="/" >
                <EuiAvatar
                  size="l"
                  type="space"
                  name="Workspace here"
                ></EuiAvatar>
              </Link>
            }
            mobileTitle="Basic example"
            toggleOpenOnMobile={() => toggleOpenOnMobile()}
            isOpenOnMobile={isSideNavOpenOnMobile}
            style={{ width: 192 }}
            items={sideNav}
          />
        </EuiPageSideBar>
      }
    >
      <EuiPageContentBody paddingSize="m">
        <Outlet />
      </EuiPageContentBody>
    </EuiPageTemplate>
  );
};
