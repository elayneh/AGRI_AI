import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../../Redux-Store/types";
import { initialState } from "../constants";

const selectSlice = (state: RootState) => state?.historyPageSliceName || initialState;

export const selectHistory = createSelector(
  [selectSlice],
  (state) => state.history
);

export const selectIsFailed = createSelector(
  [selectSlice],
  (state) => state.errorMessage
);
