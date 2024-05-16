import { useDispatch } from "react-redux";
import LoginComponent from "../../../Components/MembershipComponent/Login";
import { useLoginPageSlice } from "./slice";
import { loginPageTypes } from "./slice/types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAuthCredentials, selectIsAuthenticated } from "./slice/selector";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const authenticatedUser = useSelector(selectAuthCredentials);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const { actions } = useLoginPageSlice();
  const dispatch = useDispatch();
  const handleCredentials = (values: loginPageTypes) => {
    dispatch(actions.getLogin(values));
  };
  useEffect(() => {
    if (localStorage.getItem("token") && isAuthenticated) {
      navigate("/");
    }
  }, [authenticatedUser, isAuthenticated, navigate]);

  return <LoginComponent handleCredentials={handleCredentials} />;
};
