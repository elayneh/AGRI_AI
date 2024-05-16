import { IconType } from "react-icons";
export interface SideBarMenuItemProps {
  icon: IconType;
  label: string;
  to: string;
  iconSize: number;
  showLabel?: boolean;
  role: string | null;
  sideBarCount?: number;
}
