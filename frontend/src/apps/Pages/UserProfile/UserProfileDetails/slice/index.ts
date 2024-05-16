/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useInjectReducer,
  useInjectSaga,
} from "../../../../../Redux-Store/utils/redux-injectors";
import { createSlice } from "../../../../../Redux-Store/utils/toolkit";
import { initialState } from "../constants";
import { PayloadAction } from "@reduxjs/toolkit";
import { userProfileDetailPageSaga } from "./saga";
import { userProfileDetailCredentials } from "./types";

const slice = createSlice({
  name: "userProfileDetailPageName",
  initialState,
  reducers: {
    getUserProfileDetail(state) {
      state.isLoading = true;
    },
    getUserProfileDetailSuccess(
      state,
      action: PayloadAction<userProfileDetailCredentials>
    ) {
      state.userProfileDetailCredentials = action.payload;
      state.isAuthenticated = true;
      const { firstName, lastName, _id, token, email, role } = action.payload;
      console.log(action.payload);
      localStorage.setItem("id", _id);
      localStorage.setItem("token", token || "");
      localStorage.setItem("email", email);
      localStorage.setItem("firstName", firstName || "");
      localStorage.setItem("lastName", lastName || "");
      localStorage.setItem("role", role);
    },
    getUserProfileDetailFailed(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
  },
});

export const { actions: userProfileDetailPageActions } = slice;
export const useUserProfileDetailPageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: userProfileDetailPageSaga });
  return { actions: slice.actions };
};
