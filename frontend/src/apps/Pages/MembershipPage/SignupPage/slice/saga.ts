import { put, takeLatest } from "redux-saga/effects";
import { signUpActions as actions } from ".";
import { apiRoute } from "../../../../../utils/routes/constants";
import { makeCall } from "../../../../API";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { registerUserTypes } from "./types";
import { authCredentialTypes } from "../../LoginPage/slice/types";

function* handleSignUp(action: PayloadAction<registerUserTypes>) {
  try {
    const res: authCredentialTypes = yield makeCall({
      route: `${apiRoute.users}${apiRoute.signUp}`,
      method: "POST",
      isSecureRoute: true,
      body: action.payload,
    });
    yield put(actions.signUpSuccess(res));
  } catch (error) {
    const { message } = error as unknown as AxiosError;
    yield put(actions.signUpFailed(message));
  }
}

export function* signUpPageSaga() {
  yield takeLatest(actions.signUp, handleSignUp);
}
