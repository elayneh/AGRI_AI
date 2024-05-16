import { useEffect } from "react";
import {  useNavigate } from "react-router";

interface IUseAllowedRole {
  allowedRole?: string;
  isProtected?: boolean;
}
export function useAllowedRole(props:IUseAllowedRole) {
  const navigate = useNavigate();
  // const { pathname } = useLocation();
  console.log(props)
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/landingPage");
    }
  }, [navigate]);
}
