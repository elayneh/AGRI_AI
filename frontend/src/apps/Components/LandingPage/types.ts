export interface ProtectedRouteProps {
  children?: React.ReactNode;
  isProtected?: boolean;
  allowedRole?: string;
}
