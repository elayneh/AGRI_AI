import { IconType } from "react-icons";

export interface ISideBarTypes {
  label: string;
  to: string;
  icon: IconType;
  sideBarCount?: number;
  onClick?: () => void;
}
