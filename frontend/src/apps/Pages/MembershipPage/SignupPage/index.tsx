import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useSignUpPageSlice } from "./slice";
import { selectAuthCredentials, selectIsAuthenticated } from "./slice/selector";
import { submitTypes } from "../../../Components/MembershipComponent/Signup/types";
import SignUpComponent from "../../../Components/MembershipComponent/Signup";

export const SignUpPage = () => {
  const authenticatedUser = useSelector(selectAuthCredentials);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const { actions } = useSignUpPageSlice();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token") && isAuthenticated) navigate("/");
  }, [authenticatedUser, isAuthenticated, navigate]);
  const handleSubmit = (values: submitTypes) => {
    dispatch(actions.signUp(values));
  };
  return <SignUpComponent handleSubmit={handleSubmit} />;
};
