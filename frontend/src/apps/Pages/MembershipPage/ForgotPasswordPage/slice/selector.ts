import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../../../Redux-Store/types";
import { initialState } from "../constants";

const selectSlice = (state: RootState) =>
  state?.forgotPasswordPageName || initialState;

export const selectForgotPasswordStatus = createSelector(
  [selectSlice],
  (state) => state.resetPasswordToken
);

export const selectIsAuthenticated = createSelector(
  [selectSlice],
  (state) => state.isAuthenticated
);
