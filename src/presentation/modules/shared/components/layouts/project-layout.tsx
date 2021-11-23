import React, { useState } from "react";
import "@elastic/eui/dist/eui_theme_amsterdam_light.css";
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
  EuiHeader,
  EuiHeaderSectionItemButton,
  EuiButtonIcon,
  EuiButton,
  EuiPageContent,
} from "@elastic/eui";
import { Outlet, useNavigate } from "react-router-dom";

export const ProjectLayout: React.FC = () => {
  const navigate = useNavigate();
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
    return {
      id: slugify(name),
      name,
      isSelected: selectedItemName === name,
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
      pageSideBar={
        <EuiPageSideBar paddingSize="m">
          <EuiSideNav
            aria-label="Basic example"
            heading={
              <EuiAvatar
                size="l"
                type="space"
                name="Workspace here"
              ></EuiAvatar>
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
      <EuiHeader
        sections={[
          {
            breadcrumbs: breadcrumbs,
            borders: "right",
          },
          {
            items: [
              <EuiHeaderSectionItemButton>
                <EuiButton iconType="share" size="s" fill>
                  Share
                </EuiButton>
              </EuiHeaderSectionItemButton>,
            ],
            borders: "none",
          },
        ]}
      />
      <EuiPageContent paddingSize="m">
        <Outlet />
      </EuiPageContent>
    </EuiPageTemplate>
  );
};
