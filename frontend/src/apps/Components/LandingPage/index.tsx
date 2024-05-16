import NavigationBar from "../UI/NavBar";
import styled from "styled-components";
import HomeComponent from "./HomeComponent";
import ServicesComponent from "./ServicesComponent";
import ContactUsComponent from "./ContactusComponent";
import { Outlet, useLocation } from "react-router-dom";
import FooterComponent from "./FooterComponent";
import AboutusComponent from "./AboutusComponent";

const LandingPage = () => {
  const { pathname } = useLocation();
  const onCurrentPage = pathname.includes("signIn");

  return (
    <LandingPageContainer>
      <NavigationBar />
      {onCurrentPage ? (
        <NavbarContainer>
          <Outlet />
        </NavbarContainer>
      ) : (
        <NavbarContainer>
          <SectionWrapper id="home">
            <HomeComponent />
          </SectionWrapper>
          <SectionWrapper id="services">
            <ServicesComponent />
          </SectionWrapper>
          <SectionWrapper id="testimonials">
            <AboutusComponent />
          </SectionWrapper>
          <SectionWrapper id="contact">
            <ContactUsComponent />
          </SectionWrapper>
          <SectionWrapper id="footer">
            <FooterComponent />
          </SectionWrapper>
        </NavbarContainer>
      )}
    </LandingPageContainer>
  );
};
const LandingPageContainer = styled("div")`
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  margin-left: -8px;
`;
const NavbarContainer = styled("div")`
  // height: fit-content;
  // margin-top: 60px;
  width: 100vw;
`;
const SectionWrapper = styled("div")`
  height: fit-content;
  width: 100vw;
`;
export default LandingPage;
