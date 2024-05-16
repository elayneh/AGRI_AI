import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "../constants";
import { RootState } from "../../../../../Redux-Store/types";

const selectSlice = (state: RootState) =>
  state?.updateUserProfilePageName || initialState;

export const selectUpdateUserProfileCredentials = createSelector(
  [selectSlice],
  (state) => state.updateUserProfileCredentials
);

export const selectIsAuthenticated = createSelector(
  [selectSlice],
  (state) => state.isAuthenticated
);
