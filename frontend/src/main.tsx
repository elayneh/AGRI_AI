import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { routes } from "./utils/routes";
import { Provider } from "react-redux";
import { ConfigureAppStore } from "./Redux-Store/configureStore";
const store = ConfigureAppStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
);
