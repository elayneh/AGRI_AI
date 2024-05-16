/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useInjectReducer,
  useInjectSaga,
} from "../../../../../Redux-Store/utils/redux-injectors";
import { createSlice } from "../../../../../Redux-Store/utils/toolkit";
import { authCredentialTypes } from "../../LoginPage/slice/types";
import { initialState } from "../constants";
import { PayloadAction } from "@reduxjs/toolkit";
import { signUpPageSaga } from "./saga";

const slice = createSlice({
  name: "signUpPageName",
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    signUp(state, _action: PayloadAction<any>) {
      state.isLoading = true;
    },
    signUpSuccess(state, action: PayloadAction<authCredentialTypes>) {
      state.authCredentials = action.payload;
      state.isAuthenticated = true;
      const { _id, token, email, fullName, phoneNumber } = action.payload;
      console.log("Full name: ", fullName);
      localStorage.setItem("id", _id);
      localStorage.setItem("token", token || "");
      localStorage.setItem("email", email);
      localStorage.setItem("fullName", fullName || "");
      localStorage.setItem("phoneNumber", phoneNumber || "");
      state.isLoading = false;
    },
    signUpFailed(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
  },
});

export const { actions: signUpActions } = slice;

export const useSignUpPageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: signUpPageSaga });
  return { actions: slice.actions };
};
