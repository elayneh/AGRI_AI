/* eslint-disable @typescript-eslint/no-unused-vars */
import { initialState } from "../constants";
import { PayloadAction } from "@reduxjs/toolkit";
import { updateUserProfilePageSaga } from "./saga";
import { authCredentialTypes } from "../../../MembershipPage/LoginPage/slice/types";
import { createSlice } from "../../../../../Redux-Store/utils/toolkit";
import { updateUserProfilePageTypes } from "./types";
import {
  useInjectReducer,
  useInjectSaga,
} from "../../../../../Redux-Store/utils/redux-injectors";

const slice = createSlice({
  name: "updateUserProfilePageName",
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    fetchUserProfileRequest(
      state,
      action: PayloadAction<updateUserProfilePageTypes>
    ) {
      state.updateUserProfileCredentials = action.payload;
    },

    getUpdateUserProfile(
      state,
      _action: PayloadAction<updateUserProfilePageTypes>
    ) {
      state.isLoading = true;
    },
    updateUserProfileSuccess(
      state,
      action: PayloadAction<authCredentialTypes>
    ) {
      state.authCredentials = action.payload;
      state.isAuthenticated = true;
      const { _id, token, email } = action.payload;

      localStorage.setItem("id", _id);
      localStorage.setItem("token", token || "");
      localStorage.setItem("email", email);
      // localStorage.setItem("firstName", firstName || "");
      // localStorage.setItem("lastName", lastName || "");
      // localStorage.setItem("role", role);
      state.isLoading = false;
    },
    updateUserProfileFailed(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
  },
});

export const { actions: updateUserProfileActions } = slice;

export const useUpdateUserProfilePageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: updateUserProfilePageSaga });
  return { actions: slice.actions };
};
