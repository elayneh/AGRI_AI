import { useAllowedRole } from "../hooks/useAllowedRole";
import { ProtectedRouteProps } from "./../../apps/Components/LandingPage/types";

export const ProtectedRoute = (props: ProtectedRouteProps) => {
  useAllowedRole({
    allowedRole: props.allowedRole,
    isProtected: props.isProtected,
  });
  return <>{props.children}</>;
};
