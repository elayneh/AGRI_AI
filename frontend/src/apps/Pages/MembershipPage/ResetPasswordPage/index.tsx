import { useDispatch } from "react-redux";
import { useResetPasswordPageSlice } from "./slice";
import { resetPasswordPageTypes } from "./slice/types";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAuthCredentials, selectIsAuthenticated } from "./slice/selector";
import { useNavigate } from "react-router-dom";
import ResetPasswordComponent from "../../../Components/MembershipComponent/ResetPassword";

export const ResetPasswordPage = () => {
  const authenticatedUser = useSelector(selectAuthCredentials);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const { actions } = useResetPasswordPageSlice();
  const dispatch = useDispatch();
  const handleCredentials = (values: resetPasswordPageTypes) => {
    dispatch(actions.getResetPassword(values));
  };
  useEffect(() => {
    if (localStorage.getItem("token") && isAuthenticated) {
      navigate("/");
    }
  }, [authenticatedUser, isAuthenticated, navigate]);

  return <ResetPasswordComponent handleCredentials={handleCredentials} />;
};
