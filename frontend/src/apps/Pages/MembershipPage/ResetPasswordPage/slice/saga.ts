import { put, takeLatest } from "redux-saga/effects";
import { resetPasswordPageActions as actions } from ".";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { makeCall } from "../../../../API";
import { authCredentialTypes, resetPasswordPageTypes } from "./types";
import { apiRoute } from "../../../../../utils/routes/constants";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* handleResetPassword(action: PayloadAction<resetPasswordPageTypes>) {
  try {
    const res: authCredentialTypes = yield makeCall({
      route: `${apiRoute.users}${apiRoute.resetPassword}/${action.payload.resetToken}`,
      method: "PATCH",
      isSecureRoute: true,
      body: action.payload,
    });
    yield put(actions.getResetPasswordSuccess(res));
  } catch (error) {
    const { message } = error as unknown as AxiosError;
    yield put(actions.getResetPasswordFailed(message));
  }
}
export function* resetPasswordPageSaga() {
  yield takeLatest(actions.getResetPassword.type, handleResetPassword);
}
