import {
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

export const HeaderActionButton = styled(EuiButtonIcon)`
  margin-top: 8px;
`;
export const Page = styled(EuiPageTemplate)`
  background-color: #fff;
`;

export const SideNav = styled(EuiSideNav)`
  .euiSideNavItemButton.euiSideNavItemButton--isClickable:not(:disabled) {
    margin-bottom: 4px;
    /* font-size: 1.1rem; */
    padding: 10px 20px;
    border-radius: 5px;
    .euiSideNavItemButton__label {
      text-decoration: none;
    }
  }
  .euiSideNavItemButton .euiSideNavItemButton__label {
    /* font-weight: 500; */
    /* font-size: 1.1rem; */
  }
  .euiSideNavItemButton.euiSideNavItemButton-isSelected {
    color: #0061a6;
    background-color: rgba(0, 119, 204, 0.2);
    font-weight: 500;
  }
  .euiSideNavItemButton.euiSideNavItemButton--isClickable:not(:disabled):hover {
    color: #0061a6;
    background-color: rgba(0, 119, 204, 0.1);
    .euiSideNavItemButton__label {
      text-decoration: none;
    }
  }
`;

export const Logo = styled(EuiImage)`
  padding-left: 10px;
`;

interface IconProps {
  filled?: boolean;
}
export const NavIcon = styled(EuiIcon)<IconProps>`
  fill: ${(props) => (props.filled ? "currentColor" : "none")};
`;

NavIcon.defaultProps = {
  filled: true,
};
