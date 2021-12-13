import React, { useState } from "react";
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
  EuiPageContentBody,
} from "@elastic/eui";
import {
  Link,
  matchPath,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Auth } from "aws-amplify";

export const MainLayout: React.FC = () => {
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

  const createItem = (name: string, to: string, data: any = {}) => {
    // NOTE: Duplicate `name` values will cause `id` collisions.
    const match = to && matchPath(to, location.pathname);
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

  const signOut = async () => {
    try {
      await Auth.signOut();
      closePopover();
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  };

  const items = [
    <EuiContextMenuItem key="copy" onClick={closePopover}>
      Profile
    </EuiContextMenuItem>,
    <EuiContextMenuItem key="edit" onClick={closePopover}>
      Settings
    </EuiContextMenuItem>,
    <EuiContextMenuItem key="share" onClick={signOut}>
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
        createItem("Project 1", "projects/1", {
          icon: <EuiIcon color="#207af1" type="folderClosed" />,
        }),
        createItem("Project 2", "projects/2", {
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
      paddingSize="none"
      restrictWidth={false}
      pageContentProps={{ paddingSize: "none" }}
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
              <Link to="/">
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
