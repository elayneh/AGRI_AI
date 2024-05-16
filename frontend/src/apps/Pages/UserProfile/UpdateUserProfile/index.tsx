import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserProfilePageTypes } from "./slice/types";
import { useUpdateUserProfilePageSlice } from "./slice";
import UpdateUserProfileComponent from "../../../Components/MembershipComponent/UpdateUserProfile";
import {
  selectIsAuthenticated,
  selectUpdateUserProfileCredentials,
} from "./slice/selectors";

export const LoginPage = () => {
  const authenticatedUser = useSelector(selectUpdateUserProfileCredentials);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const { actions } = useUpdateUserProfilePageSlice();
  const dispatch = useDispatch();
  const handleCredentials = (values: updateUserProfilePageTypes) => {
    dispatch(actions.getUpdateUserProfile(values));
  };
  useEffect(() => {
    if (localStorage.getItem("token") && isAuthenticated) {
      navigate("/");
    }
  }, [authenticatedUser, isAuthenticated, navigate]);

  return <UpdateUserProfileComponent handleCredentials={handleCredentials} />;
};
