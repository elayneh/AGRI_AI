import { put, takeLatest } from "redux-saga/effects";
import { loginPageActions as actions } from ".";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { makeCall } from "../../../../API";
import { authCredentialTypes } from "./types";
import { apiRoute } from "../../../../../utils/routes/constants";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* handleLogin(action: PayloadAction<authCredentialTypes>) {
  try {
    const res: authCredentialTypes = yield makeCall({
      route: `${apiRoute.users}${apiRoute.login}`,
      method: "POST",
      isSecureRoute: true,
      body: action.payload,
    });
    yield put(actions.getLoginSuccess(res));
  } catch (error) {
    const { message } = error as unknown as AxiosError;
    yield put(actions.getLoginFailed(message));
  }
}
export function* loginPageSaga() {
  yield takeLatest(actions.getLogin.type, handleLogin);
}
