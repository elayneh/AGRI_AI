import styled from "styled-components";
import { Outlet } from "react-router-dom";
import AuthNavigationBar from "../UI/AuthNavBar";
import { UserDashboardLayoutComponentProps } from "./types";
import BottomNav from "../UI/AuthBottomNav";

const UserDashboardComponent = (_props: UserDashboardLayoutComponentProps) => {
  return (
    <UserdashboardContainer>
      <AuthNavigationBar />
      <NavbarContainer>
        <Outlet />
      </NavbarContainer>
      <BottomNav />
    </UserdashboardContainer>
  );
};
const UserdashboardContainer = styled("div")`
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  margin-left: -8px;
  margin-top: 25px;
`;
const NavbarContainer = styled("div")`
  // height: fit-content;
  // margin-top: 60px;
  width: 100vw;
`;
export default UserDashboardComponent;
