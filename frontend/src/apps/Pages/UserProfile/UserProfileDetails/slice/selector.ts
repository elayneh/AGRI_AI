import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../../../Redux-Store/types";
import { initialState } from "../constants";

const selectSlice = (state: RootState) =>
  state?.userProfileDetailPageName || initialState;

export const selectUserProfileDetailCredentials = createSelector(
  [selectSlice],
  (state) => state.userProfileDetailCredentials
);

export const selectIsAuthenticated = createSelector(
  [selectSlice],
  (state) => state.isAuthenticated
);
