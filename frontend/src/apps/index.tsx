import React from "react";
import { Outlet } from "react-router-dom";
import UserDashboardComponent from "./Components/DefaultComponent";
const App = () => {
  return (
    <React.StrictMode>
      <UserDashboardComponent>{<Outlet />}</UserDashboardComponent>
    </React.StrictMode>
  );
};

export default App;
