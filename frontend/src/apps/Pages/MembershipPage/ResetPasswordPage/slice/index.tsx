/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useInjectReducer,
  useInjectSaga,
} from "../../../../../Redux-Store/utils/redux-injectors";
import { createSlice } from "../../../../../Redux-Store/utils/toolkit";
import { initialState } from "../constants";
import { PayloadAction } from "@reduxjs/toolkit";
import { resetPasswordPageSaga } from "./saga";
import { authCredentialTypes, resetPasswordPageTypes } from "./types";

const slice = createSlice({
  name: "resetPasswordPageName",
  initialState,
  reducers: {
    getResetPassword(state, _action: PayloadAction<resetPasswordPageTypes>) {
      state.isLoading = true;
    },
    getResetPasswordSuccess(state, action: PayloadAction<authCredentialTypes>) {
      state.authCredentials = action.payload;
      state.isAuthenticated = true;
      const { _id, token, email } = action.payload;
      localStorage.setItem("id", _id);
      localStorage.setItem("token", token || "");
      localStorage.setItem("email", email);
      // localStorage.setItem("firstName", firstName || "");
      // localStorage.setItem("lastName", lastName || "");
      // localStorage.setItem("role", role);
      // const filesString = JSON.stringify(files);
      // localStorage.setItem("files", filesString);
      state.isLoading = false;
    },
    getResetPasswordFailed(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
  },
});

export const { actions: resetPasswordPageActions } = slice;
export const useResetPasswordPageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: resetPasswordPageSaga });
  return { actions: slice.actions };
};
