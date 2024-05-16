import { AccessControl } from "accesscontrol";
const ac = new AccessControl();

const grantedList = [
  {
    role: "steward",
    resource: "users",
    action: "read:any",
    attributes: ["*", "!password"],
  },
  {
    role: "admin",
    resource: "users",
    action: "read:any",
    attributes: ["*", "!password"],
  },
  {
    role: "chef",
    resource: "users",
    action: "read:any",
    attributes: ["*", "!password"],
  },
  {
    role: "customer",
    resource: "users",
    action: "read:any",
    attributes: ["*", "!password"],
  },
];
ac.setGrants(grantedList);
export default ac;
