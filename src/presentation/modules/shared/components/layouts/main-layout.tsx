import React, { useState } from "react";
import "@elastic/eui/dist/eui_theme_amsterdam_light.css";
import {
  EuiEmptyPrompt,
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
} from "@elastic/eui";
import { Outlet, useNavigate } from "react-router-dom";

export const MainLayout: React.FC = () => {
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

  const createItem = (name: string, to: string, data: any = {}) => {
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
  const sideNav = [
    createItem("", "", {
      onClick: undefined,
      items: [
        createItem("Home", "/", {
          icon: <EuiIcon color="rgb(252, 180, 21)" type="home" />,
        }),
        createItem("Find", "/find", {
          icon: <EuiIcon type="search" color="#a21a68" />,
        }),
        createItem("Drafts", "/drafts", {
          icon: <EuiIcon color="rgb(137, 137, 137)" type="document" />,
        }),
      ],
    }),
    createItem("Projects", "", {
      onClick: undefined,
      items: [
        createItem("Create Project", "", {
          icon: <EuiIcon type="plus" />,
        }),
        createItem("Project 1", "", {
          icon: <EuiIcon color="#207af1" type="folderClosed" />,
        }),
        createItem("Project 2", "", {
          icon: <EuiIcon color="#207af1" type="folderClosed" />,
        }),
      ],
    }),
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
      pageContentProps={{ paddingSize: "none" }}
      pageHeader={{
        iconType: "logoElastic",
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
        <EuiPageSideBar>
          <EuiSideNav
            aria-label="Basic example"
            heading="Liquid"
            mobileTitle="Basic example"
            toggleOpenOnMobile={() => toggleOpenOnMobile()}
            isOpenOnMobile={isSideNavOpenOnMobile}
            style={{ width: 192 }}
            items={sideNav}
          />
        </EuiPageSideBar>
      }
    >
      <Outlet/>
    </EuiPageTemplate>
  );
};
