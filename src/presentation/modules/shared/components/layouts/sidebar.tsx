import {
  slugify,
  EuiIcon,
  EuiPageSideBar,
  EuiSideNavItemType,
  IconType,
} from "@elastic/eui";
import { icon } from "@elastic/eui/src/components/icon/assets/empty";
import { Projects as Project } from "models";
import { useEffect, useState } from "react";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { Logo, NavIcon, SideNav } from "./layout.styles";

export interface Item {
  label: string;
  isIndex?: boolean;
  icon: string | IconType;
  path: string;
  route: string | string[];
  color: string;
  filled?: boolean;
}
interface Props {
  projects?: Project[];
  items: Item[];
  hasProjects?: boolean;
}

export const SideBar: React.FC<Props> = ({ projects, items, hasProjects }) => {
  const [sideNav, setSideNav] = useState<EuiSideNavItemType<unknown>[]>();
  const [selectedItemName, setSelectedItem] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const selectItem = (name: string) => {
    setSelectedItem(name);
  };

  useEffect(() => {
    const createItem = (
      name: string,
      to: string,
      data: any = {},
      route?: string | string[]
    ) => {
      const match = route
        ? Array.isArray(route)
          ? route.find((path) =>
              matchPath(
                {
                  path: path,
                },
                location.pathname
              )
            )
          : matchPath(
              {
                path: route,
              },
              location.pathname
            )
        : false;

      return {
        id: slugify(name),
        name,
        isSelected:
          route !== undefined
            ? selectedItemName === name || Boolean(match)
            : false,
        onClick: () => {
          selectItem(name);
          if (to) navigate(to);
        },
        ...data,
      };
    };

    const sideNav = [
      createItem("", "", {
        onClick: undefined,
        items: items.map((item) =>
          createItem(
            item.label,
            item.path,
            {
              icon: (
                <NavIcon
                  $filled={item.filled}
                  color={item.color}
                  size="l"
                  type={item.icon}
                />
              ),
            },
            item.route
          )
        ),
      }),
    ];
    if (hasProjects) {
      sideNav.push(
        createItem("Projects", "", {
          onClick: undefined,
          items:
            projects && projects.length > 0
              ? projects.map((project) =>
                  createItem(
                    project.name,
                    `/projects/${project.id}`,
                    {
                      icon: project.icon ? (
                        <span style={{ fontSize: 24 }}>{project.icon}</span>
                      ) : (
                        <EuiIcon
                          color="#207af1"
                          size="l"
                          type={"folderClosed"}
                        />
                      ),
                    },
                    "/projects/:id"
                  )
                )
              : [
                  createItem("No Projects", "", {
                    disabled: true,
                  }),
                ],
        })
      );
    }
    setSideNav(sideNav);
  }, [
    hasProjects,
    items,
    location.pathname,
    navigate,
    projects,
    selectedItemName,
  ]);

  return sideNav ? (
    <EuiPageSideBar paddingSize="m">
      <SideNav
        aria-label="Nugget"
        heading={
          <Link to="/">
            <Logo size="s" alt="liquid" src="/logo.png" />
          </Link>
        }
        mobileTitle="Nugget"
        items={sideNav}
      />
    </EuiPageSideBar>
  ) : null;
};
