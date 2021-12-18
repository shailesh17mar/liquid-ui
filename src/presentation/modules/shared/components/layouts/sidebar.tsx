import { slugify, EuiIcon, EuiPageSideBar } from "@elastic/eui";
import { Projects as Project } from "models";
import { useState } from "react";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { Logo, SideNav } from "./layout.styles";

export interface Item {
  label: string;
  icon: string;
  path: string;
  color: string;
}
interface Props {
  projects?: Project[];
  items: Item[];
  hasProjects?: boolean;
}

export const SideBar: React.FC<Props> = ({ projects, items, hasProjects }) => {
  const [selectedItemName, setSelectedItem] = useState("Time stuff");
  const navigate = useNavigate();
  const location = useLocation();
  const selectItem = (name: string) => {
    setSelectedItem(name);
  };
  const createItem = (name: string, to: string, data: any = {}) => {
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

  const sideNav = [
    createItem("", "", {
      onClick: undefined,
      items: items.map((item) =>
        createItem(item.label, item.path, {
          icon: <EuiIcon color={item.color} size="l" type={item.icon} />,
        })
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
                createItem(project.name, `/projects/${project.id}`, {
                  icon: (
                    <EuiIcon color="#207af1" size="l" type="folderClosed" />
                  ),
                })
              )
            : [
                createItem("No Projects", "", {
                  disabled: true,
                }),
              ],
      })
    );
  }

  return (
    <EuiPageSideBar paddingSize="m">
      <SideNav
        aria-label="Liquid"
        heading={
          <Link to="/">
            <Logo size="s" alt="liquid" src="/logo.png" />
          </Link>
        }
        mobileTitle="Liquid"
        items={sideNav}
      />
    </EuiPageSideBar>
  );
};
