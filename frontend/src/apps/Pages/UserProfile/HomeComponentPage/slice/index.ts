/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useInjectReducer,
  useInjectSaga,
} from "../../../../../Redux-Store/utils/redux-injectors";
import { createSlice } from "../../../../../Redux-Store/utils/toolkit";
import { initialState } from "../constants";
import { PayloadAction } from "@reduxjs/toolkit";
import { loginPageSaga } from "./saga";
import { submitImageTypes } from "./types";

const slice = createSlice({
  name: "homePageSliceName",
  initialState,
  reducers: {
    getImageSubmit(state, _action: PayloadAction<submitImageTypes>) {
      state.isLoading = true;
    },
    getImageSubmitSuccess(state, action: PayloadAction<string>) {
      state.successMessage = action.payload;
      state.isLoading = false;
    },
    getImageSubmitFailed(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
    getImagePredictionSuccess(state, _action: PayloadAction<string>) {
      state.isLoading = true;
      state.predictedDisease = _action.payload;
    },
    getImagePredictionFailure(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
    setDiseaseTitle(state, _action: PayloadAction<string>) {
      state.isLoading = true;
      state.diseaseTitle=_action.payload;
    },
  },
});

export const { actions: loginPageActions } = slice;
export const useHomePageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: loginPageSaga });
  return { actions: slice.actions };
};
