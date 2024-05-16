import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../../../Redux-Store/types";
import { initialState } from "../constants";

const selectSlice = (state: RootState) => state?.loginPageName || initialState;

export const selectAuthCredentials = createSelector(
  [selectSlice],
  (state) => state.authCredentials
);

export const selectIsAuthenticated = createSelector(
  [selectSlice],
  (state) => state.isAuthenticated
);
