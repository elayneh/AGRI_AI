/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useInjectReducer,
  useInjectSaga,
} from "../../../../../Redux-Store/utils/redux-injectors";
import { createSlice } from "../../../../../Redux-Store/utils/toolkit";
import { initialState } from "../constants";
import { PayloadAction } from "@reduxjs/toolkit";
import { forgotPasswordPageTypes, resetPasswordToken } from "./types";
import { forgotPasswordPageSaga } from "./saga";

const slice = createSlice({
  name: "forgotPasswordPageName",
  initialState,
  reducers: {
    getForgotPassword(state, _action: PayloadAction<forgotPasswordPageTypes>) {
      state.isLoading = true;
    },
    getForgotPasswordSuccess(state, _action: PayloadAction<resetPasswordToken>) {
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    getForgotPasswordFailed(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
  },
});

export const { actions: forgotPasswordPageActions } = slice;
export const useForgotPasswordPageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: forgotPasswordPageSaga });
  return { actions: slice.actions };
};
