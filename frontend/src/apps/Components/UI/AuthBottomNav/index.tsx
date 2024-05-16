import React, { useState, useEffect } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from "@mui/icons-material/Person";
import { useLocation, useNavigate } from "react-router-dom";
import { Flex } from "../../../BasicStyles/Flex";

const BottomNav: React.FC = () => {
  const [value, setValue] = useState(0);
  const [visited, setVisited] = useState([true, false, false, false]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      setVisited([true, false, false, false]);
    }
  }, [location]);

  const handleNavigationChange = (
    _event: React.ChangeEvent<{}>,
    newValue: number
  ) => {
    setValue(newValue);
    const newVisited = [...visited];
    newVisited[newValue] = true;
    setVisited(newVisited);
  };

  return (
    <Flex
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 9999,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BottomNavigation
        value={value}
        onChange={handleNavigationChange}
        showLabels
        style={{width:'100%'}}
      >
        <BottomNavigationAction
          style={{ color: visited[0] ? "green" : "black" }}
          label="Home"
          icon={<HomeIcon />}
          onClick={() => {
            setValue(0);
            navigate("/");
          }}
        />
        <BottomNavigationAction
          style={{ color: visited[1] ? "green" : "black" }}
          label="Search"
          icon={<SearchIcon />}
          onClick={() => {
            setValue(1);
            navigate("/user/search");
          }}
        />
        <BottomNavigationAction
          style={{ color: visited[2] ? "green" : "black" }}
          label="History"
          icon={<HistoryIcon />}
          onClick={() => {
            setValue(2);
            navigate("/user/history");
          }}
        />
        <BottomNavigationAction
          style={{ color: visited[3] ? "green" : "black" }}
          label="Profile"
          icon={<PersonIcon />}
          onClick={() => {
            setValue(3);
            navigate("/user/profile");
          }}
        />
      </BottomNavigation>
    </Flex>
  );
};

export default BottomNav;
