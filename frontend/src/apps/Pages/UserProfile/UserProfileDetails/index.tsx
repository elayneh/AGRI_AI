import { useDispatch } from "react-redux";
import LoginComponent from "../../../Components/MembershipComponent/Login";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectUserProfileDetailCredentials,
} from "./slice/selector";
import { useNavigate } from "react-router-dom";
import { useUserProfileDetailPageSlice } from "./slice";

export const UserProfileDetailPage = () => {
  const authenticatedUser = useSelector(selectUserProfileDetailCredentials);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const { actions } = useUserProfileDetailPageSlice();
  const dispatch = useDispatch();
  const handleCredentials = () => {
    dispatch(actions.getUserProfileDetail());
  };
  useEffect(() => {
    if (localStorage.getItem("token") && isAuthenticated) {
      localStorage.getItem("role") === "admin"
        ? navigate("/admin/profile")
        : navigate("/user/profile");
    }
  }, [authenticatedUser, isAuthenticated, navigate]);

  return <LoginComponent handleCredentials={handleCredentials} />;
};
