import { ISideBarTypes } from "./types";
import { RxDashboard } from "react-icons/rx";
import { RiFileAddLine, RiLockLine, RiUser2Line } from "react-icons/ri";
import { SiSimpleanalytics } from "react-icons/si";

export const AdminMenu: ISideBarTypes[] = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: RxDashboard,
  },
  {
    label: "Manage User",
    to: "/manage-user",
    icon: RiUser2Line,
  },
  { label: "Manage Admin", to: "/manage-admin", icon: RiLockLine },
  {
    label: "Analytics",
    to: "/analytics",
    icon: SiSimpleanalytics,
  },
];

export const UserMenu: ISideBarTypes[] = [
  { label: "Dashboad", to: "/dashboard", icon: RxDashboard },
  { label: "Order", to: "/Orders", icon: RiFileAddLine },
];
