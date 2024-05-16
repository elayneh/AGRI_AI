/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  useInjectReducer,
  useInjectSaga,
} from "../../../../Redux-Store/utils/redux-injectors";
import { createSlice } from "../../../../Redux-Store/utils/toolkit";
import { initialState } from "../constants";
import { PayloadAction } from "@reduxjs/toolkit";
import { loginPageSaga } from "./saga";
import { historyTypes } from "./types";

const slice = createSlice({
  name: "userProfileSliceName",
  initialState,
  reducers: {
    getHistory(state, _action: PayloadAction<{userId:string}>) {
      state.isLoading = true;
    },
    getHistorySuccess(state, action: PayloadAction<historyTypes[]>) {
      state.history = action.payload;
      state.isLoading = false;
    },
    getHistoryFailed(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
    saveImageInSlice(state, _action: PayloadAction<any>) {
      state.imageFile = _action.payload;
      state.isLoading = true;

    },
  },
});

export const { actions: loginPageActions } = slice;
export const useUserProfilePageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: loginPageSaga });
  return { actions: slice.actions };
};
