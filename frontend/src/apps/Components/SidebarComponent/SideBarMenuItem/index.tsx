import styled from "styled-components";
import { theme } from "../../../Styles/theme";
import { Text } from "../../../BasicStyles/Text";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SideBarMenuItemProps } from "./types";
import { Badge } from "@mui/material";

export function SideBarMenuItem({
  icon,
  label,
  showLabel = true,
  iconSize,
  to,
  role,
  sideBarCount,
}: SideBarMenuItemProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onCurrentPage = pathname.includes(label.toLocaleLowerCase());
  const url = role ? `${role}${to}` : "";

  return (
    <SideBarMenuItemContainer
      onClick={() => navigate(url)}
      style={{
        backgroundColor: onCurrentPage ? `${theme.colors.sidebar[7]}` : "",
        paddingInline: showLabel ? "30px" : "12px",
      }}
    >
      <Text fontSize={iconSize} marginX={showLabel ? "" : "auto"}>
        {React.createElement(icon)}
      </Text>
      {showLabel && (
        <>
          <SideBarLabel
            style={{
              color: onCurrentPage ? theme.colors.white[9] : "",
            }}
          >
            {label}
          </SideBarLabel>
          {sideBarCount && (
            <SideBarCount>
              <Badge badgeContent={sideBarCount} color="primary"></Badge>
            </SideBarCount>
          )}
        </>
      )}
    </SideBarMenuItemContainer>
  );
}

const SideBarCount = styled("text")`
  color: ${theme.colors.sidebar[9]};
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
  margin-left: auto;
`;

const SideBarLabel = styled("span")`
  margin-left: 8px;
  font-size: 12px;
  font-family: Inter;
  color: rgba(138, 166, 170, 1);
`;

const SideBarMenuItemContainer = styled("button")`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-block: 11px;
  transition: background 300ms ease-in-out;
  border-radius: 5px;
  margin-block: 3px;
  background: none;
  color: white;
  border: none;
  outline: none;
  align-self: stretch;
  width: 100%;

  &:hover,
  &:focus {
    background: ${theme.colors.sidebar[7]};
  }

  &:focus {
    outline: none;
  }

  &:hover > span {
    color: white;
  }
`;
