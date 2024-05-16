import ContactUsComponent from "../../apps/Components/LandingPage/ContactusComponent";
import HomeComponent from "../../apps/Components/LandingPage/HomeComponent";
import ServicesComponent from "../../apps/Components/LandingPage/ServicesComponent";
import AboutusComponent from "../../apps/Components/LandingPage/AboutusComponent";
import { LoginPageLoader } from "../../apps/Pages/MembershipPage/LoginPage/Loadable";
import { HomeComponentPage } from "../../apps/Pages/UserProfile/HomeComponentPage";
import { HistoryPageLoader } from "../../apps/Pages/HistoryComponentPage/loadable";

export const routeProtection = [
  {
    path: "/user/dashboard",
    element: <HomeComponentPage />,
    allowedRole: "user",
  },
  {
    path: "/",
    element: <HomeComponentPage />,
    allowedRole: "user",
  },

  {
    path: "/user/search",
    element: <HomeComponentPage />,
    allowedRole: "user",
  },
  {
    path: "/user/history",
    element: <HistoryPageLoader />,
    allowedRole: "user",
  },
  {
    path: "/user/profile",
    element: <HomeComponentPage />,
    allowedRole: "user",
  },
  {
    path: "/admin/dashboard",
    element: <HomeComponent />,
    allowedRole: "admin",
  },
  {
    path: "/seeker/applications",
    element: <HomeComponent />,
    allowedRole: "seeker",
  },
  {
    path: "/seeker/jobs",
    element: <HomeComponent />,
    allowedRole: "seeker",
  },
  {
    path: "/seeker/schedules",
    element: <HomeComponent />,
    allowedRole: "seeker",
  },
  {
    path: "/seeker/jobs/:jobId",
    element: <HomeComponent />,
    allowedRole: "seeker",
  },
  {
    path: "/seeker/chats",
    element: <HomeComponent />,
    allowedRole: "seeker",
  },
  {
    path: "/seeker/chats/:contactId",
    element: <HomeComponent />,
    allowedRole: "seeker",
  },
  {
    path: "/seeker/livestream",
    element: <HomeComponent />,
    allowedRole: "seeker",
  },
];
export const landingPageRoutes = [
  {
    path: "about",
    element: <AboutusComponent />,
    id: "about",
  },
  {
    path: "contact",
    element: <ContactUsComponent />,
  },
  {
    path: "services",
    element: <ServicesComponent />,
    id: "services",
  },
  {
    path: "home",
    element: <HomeComponent />,
    id: "home",
  },
  {
    path: "signIn",
    element: <LoginPageLoader />,
  },
];
