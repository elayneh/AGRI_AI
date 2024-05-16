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
  name: "historyPageSliceName",
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
  },
});

export const { actions: loginPageActions } = slice;
export const useHistoryPageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: loginPageSaga });
  return { actions: slice.actions };
};
