/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useInjectReducer,
  useInjectSaga,
} from "../../../../../Redux-Store/utils/redux-injectors";
import { createSlice } from "../../../../../Redux-Store/utils/toolkit";
import { initialState } from "../constants";
import { PayloadAction } from "@reduxjs/toolkit";
import { loginPageSaga } from "./saga";
import { authCredentialTypes, loginPageTypes } from "./types";

const slice = createSlice({
  name: "loginPageName",
  initialState,
  reducers: {
    getLogin(state, _action: PayloadAction<loginPageTypes>) {
      state.isLoading = true;
    },
    getLoginSuccess(state, action: PayloadAction<authCredentialTypes>) {
      state.authCredentials = action.payload;
      state.isAuthenticated = true;
      const { _id, token, email } = action.payload;
      localStorage.setItem("id", _id);
      localStorage.setItem("token", token || "");
      localStorage.setItem("email", email);
      // localStorage.setItem("firstName", firstName || "");
      // localStorage.setItem("lastName", lastName || "");
      // localStorage.setItem("role", role);
    },
    getLoginFailed(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.authCredentials = initialState.authCredentials;
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      localStorage.removeItem("name");
      localStorage.removeItem("settings");
    },
  },
});

export const { actions: loginPageActions } = slice;
export const useLoginPageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: loginPageSaga });
  return { actions: slice.actions };
};
