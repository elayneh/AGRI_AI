/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { theme } from "../../Styles/theme";
import { RoleMenu } from "../../../utils/util/RoleMenu";
import { SideBarMenuItem } from "./SideBarMenuItem";
import { SideBarProps } from "./types";
import { useEffect } from "react";

const SideBar = ({ setShowSideBar, showSideBar }: SideBarProps) => {
  const role: string | null = localStorage.getItem("role");
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1147) {
        setShowSideBar(false);
      } else {
        setShowSideBar(true);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <SideBarContainer
      style={{
        minWidth: showSideBar ? "228px" : "60px",
      }}
    >
      <SidebarBodyContainer>
        {RoleMenu(role)?.map(({ icon, label, to, sideBarCount }, index) => (
          <SideBarMenuItem
            icon={icon}
            iconSize={22}
            key={index}
            label={label}
            role={role}
            showLabel={showSideBar}
            to={to}
            sideBarCount={sideBarCount}
          />
        ))}
      </SidebarBodyContainer>
    </SideBarContainer>
  );
};

export default SideBar;
const SideBarContainer = styled("div")`
  display: flex;
  flex-direction: column;
  background: ${theme.colors.black[9]};
  color: ${theme.colors.white[4]};
  position: fixed;
  transition: all 100ms ease-in-out;
  left: 0px;
  top: 70px;
  height: 100%;
  z-index: 5;
`;
const SidebarBodyContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-inline: 17px;
  margin-bottom: auto;
  margin-top: 40px;
`;
