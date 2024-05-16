import { lazyLoad } from "./../../../utils/loadable";

export const HistoryPageLoader = lazyLoad(
  () => import("./index"),
  (module) => module.HistoryComponentPage
);
