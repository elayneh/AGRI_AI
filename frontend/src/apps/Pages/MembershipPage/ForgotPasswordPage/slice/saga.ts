import { put, takeLatest } from "redux-saga/effects";
import { forgotPasswordPageActions as actions } from ".";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { makeCall } from "../../../../API";
import { apiRoute } from "../../../../../utils/routes/constants";
import { forgotPasswordPageTypes, resetPasswordToken } from "./types";
function* handleForgotPassword(action: PayloadAction<forgotPasswordPageTypes>) {
  try {
    const res: resetPasswordToken = yield makeCall({
      route: `${apiRoute.users}${apiRoute.forgotPassword}`,
      method: "POST",
      isSecureRoute: true,
      body: action.payload,
    });
    yield put(actions.getForgotPasswordSuccess(res));
  } catch (error) {
    const { message } = error as unknown as AxiosError;
    yield put(actions.getForgotPasswordFailed(message));
  }
}
export function* forgotPasswordPageSaga() {
  yield takeLatest(actions.getForgotPassword.type, handleForgotPassword);
}
