import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../../../Redux-Store/types";
import { initialState } from "../constants";

const selectSlice = (state: RootState) => state?.homePageSliceName || initialState;

export const selectIsSuccess = createSelector(
  [selectSlice],
  (state) => state.successMessage
);

export const selectIsFailed = createSelector(
  [selectSlice],
  (state) => state.errorMessage
);

export const selectPredictedDisease = createSelector(
  [selectSlice],
  (state) => state.predictedDisease
);
export const selectDiseaseTitle = createSelector(
  [selectSlice],
  (state) => state.diseaseTitle
);