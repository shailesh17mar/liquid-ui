import {
  EuiBreadcrumbs,
  EuiButton,
  EuiButtonIcon,
  EuiContextMenuItem,
  EuiIcon,
  EuiImage,
  EuiPageTemplate,
  EuiSideNav,
} from "@elastic/eui";
import { EuiSideNavItem } from "@elastic/eui/src/components/side_nav/side_nav_item";
import styled from "styled-components";

export const Heading = styled.h1`
  display: flex;
  justify-content: center;
`;

export const InnerContainer = styled.div`
  padding-top: 40px;
`;

export const HeaderActionButton = styled(EuiButton)`
  margin-top: 6px;
`;

export const Page = styled(EuiPageTemplate)`
  background-color: #fff;
`;

export const SideNav = styled(EuiSideNav)`
  .euiSideNavItemButton.euiSideNavItemButton--isClickable:not(:disabled) {
    margin-bottom: 2px;
    padding: 8px 16px;
    border-radius: 3px;
    .euiSideNavItemButton__label {
      text-decoration: none;
    }
  }
  .euiSideNavItemButton .euiSideNavItemButton__label {
    /* font-weight: 500; */
  }
  .euiSideNavItemButton.euiSideNavItemButton-isSelected {
    color: #3778ff;
    background-color: #e8f0fe;
    font-weight: 500;
  }
  .euiSideNavItemButton.euiSideNavItemButton--isClickable:not(:disabled):hover {
    color: #3778ff;
    background-color: #e8f0fe;
    .euiSideNavItemButton__label {
      text-decoration: none;
    }
  }
`;

export const Logo = styled(EuiImage)`
  padding-right: 10px;
  width: 64px;
`;

interface IconProps {
  $filled?: boolean;
}
export const NavIcon = styled(EuiIcon)<IconProps>`
  fill: ${(props) => (props.$filled ? "currentColor" : "none")};
`;

NavIcon.defaultProps = {
  $filled: true,
};

export const Breadcrumbs = styled(EuiBreadcrumbs)`
  border-bottom: 1px solid #d3dae6;
  padding-bottom: 16px;
`;
