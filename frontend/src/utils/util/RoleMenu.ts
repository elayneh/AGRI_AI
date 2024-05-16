import { AdminMenu, UserMenu } from "./constants";
export const RoleMenu = (role?: string | null) => {
  return role === "admin" ? AdminMenu : role === "user" ? UserMenu : null;
};
