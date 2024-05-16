import { lazyLoad } from "./../../../../utils/loadable";

export const LoginPageLoader = lazyLoad(
  () => import("./index"),
  (module) => module.HomeComponentPage
);
