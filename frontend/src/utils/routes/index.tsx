import { createBrowserRouter } from "react-router-dom";
import PageNotFound from "../../apps/Components/PagenotFoundComponent";
import LandingPage from "../../apps/Components/LandingPage";
import { landingPageRoutes, routeProtection } from "./protectionRule";
import { ProtectedRoute } from "./ProtectedRoute";
import App from "../../apps";
import { ResetPasswordPage } from "../../apps/Pages/MembershipPage/ResetPasswordPage";
import { ForgotPasswordPage } from "../../apps/Pages/MembershipPage/ForgotPasswordPage";
import { SignUpPageLoader } from "../../apps/Pages/MembershipPage/SignupPage/Loadable";

export const routes = createBrowserRouter(
  [
    
    {
      path: "/landingPage",
      element: localStorage.getItem("token") ? (
        <ProtectedRoute isProtected={true}>{<LandingPage />}</ProtectedRoute>
      ) : (
        <LandingPage />
      ),
      errorElement: <PageNotFound />,
      children: landingPageRoutes.map(({ path, element }) => ({
        path: path,
        element: element,
      })),
    },
    {
      path: "/landingPage/register",
      element: !localStorage.getItem("token") ? (
        <SignUpPageLoader />
      ) : (
        <ProtectedRoute isProtected={true}>{<LandingPage />}</ProtectedRoute>
      ),
      errorElement: <PageNotFound />,
    },
    {
      path: "/landingPage/forgot-password",
      element: !localStorage.getItem("token") ? (
        <ForgotPasswordPage />
      ) : (
        <ProtectedRoute isProtected={true}>
          {<ForgotPasswordPage />}
        </ProtectedRoute>
      ),
      errorElement: <PageNotFound />,
    },
    {
      path: "password_reset/:password_reset_token",
      element: !localStorage.getItem("token") ? (
        <ResetPasswordPage />
      ) : (
        <ProtectedRoute isProtected={true}>
          {<ResetPasswordPage />}
        </ProtectedRoute>
      ),
      errorElement: <PageNotFound />,
    },
    {
      path: "/",
      element: <ProtectedRoute isProtected={true}>{<App />}</ProtectedRoute>,
      errorElement: <PageNotFound />,
      children: routeProtection.map(({ path, element, allowedRole }) => ({
        path: path,
        element: (
          <ProtectedRoute allowedRole={allowedRole}>{element}</ProtectedRoute>
        ),
      })),
    },
  ],
  // {
  //   basename: "/agriai",
  // }
);
