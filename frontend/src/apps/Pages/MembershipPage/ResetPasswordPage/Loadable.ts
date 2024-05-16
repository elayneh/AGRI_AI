import { lazyLoad } from "./../../../../utils/loadable";

export const ResetPasswordPageLoader = lazyLoad(
  () => import("./index"),
  (module) => module.ResetPasswordPage
);
