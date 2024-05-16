import { useDispatch } from "react-redux";
import { useForgotPasswordPageSlice } from "./slice";
import { forgotPasswordPageTypes } from "./slice/types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectForgotPasswordStatus,
  selectIsAuthenticated,
} from "./slice/selector";
import { useNavigate } from "react-router-dom";
import ForgotPasswordComponent from "../../../Components/MembershipComponent/ForgotPassword";

export const ForgotPasswordPage = () => {
  const authenticatedUser = useSelector(selectForgotPasswordStatus);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const { actions } = useForgotPasswordPageSlice();
  const dispatch = useDispatch();
  const handleCredentials = (values: forgotPasswordPageTypes) => {
    dispatch(actions.getForgotPassword(values));
  };
  useEffect(() => {
    if (localStorage.getItem("token") && isAuthenticated) {
      navigate("/");
    }
  }, [authenticatedUser, isAuthenticated, navigate]);

  return <ForgotPasswordComponent handleCredentials={handleCredentials} />;
};
