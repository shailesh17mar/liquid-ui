import React, { useState } from "react";
import {
  EuiIcon,
  EuiPageSideBar,
  EuiPageTemplate,
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
import { Auth } from "aws-amplify";
import { Logo, SideNav } from "./layout.styles";

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

  const createItem = (name: string, to: string = "", data: any = {}) => {
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
  const palette = euiPaletteColorBlind({ direction: "both", order: "append" });
  const sideNav = [
    createItem("", "", {
      onClick: undefined,
      items: [
        createItem("Readme", "", {
          icon: <EuiIcon size="l" color={palette[0]} type="documentation" />,
        }),
        createItem("Stories", "stories", {
          icon: <EuiIcon size="l" color={palette[1]} type="tableOfContents" />,
        }),
        createItem("Highlights", "highlights", {
          icon: <EuiIcon size="l" type="documentEdit" color={palette[2]} />,
        }),
        createItem("Tags", "tags", {
          icon: <EuiIcon size="l" color={palette[3]} type="tag" />,
        }),
        createItem("Insights", "insights", {
          icon: <EuiIcon size="l" color={palette[4]} type="visPie" />,
        }),
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
          <SideNav
            aria-label="Liquid"
            heading={
              <Link to="/">
                <Logo size="s" alt="liquid" src="/logo.png" />
              </Link>
            }
            mobileTitle="Basic example"
            toggleOpenOnMobile={() => toggleOpenOnMobile()}
            isOpenOnMobile={isSideNavOpenOnMobile}
            items={sideNav}
          />
        </EuiPageSideBar>
      }
    >
      <Outlet />
    </EuiPageTemplate>
  );
};
