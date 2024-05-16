import { lazyLoad } from "../../../../utils/loadable";

export const SignUpPageLoader = lazyLoad(
  () => import("./index"),
  (module) => module.SignUpPage
);
