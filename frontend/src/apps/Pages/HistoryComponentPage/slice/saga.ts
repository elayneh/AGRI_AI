import { put, takeLatest } from "redux-saga/effects";
import { loginPageActions as actions } from ".";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { makeCall } from "../../../API";
import { historyTypes } from "./types";
import { apiRoute } from "../../../../utils/routes/constants";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* handleGetHistory(action: PayloadAction<{userId:string}>) {
  try {
    const res: historyTypes[] = yield makeCall({
      route: `${apiRoute.users}${apiRoute.getHistory}`,
      method: "POST",
      isSecureRoute: true,
      body: action.payload,
    });
    yield put(actions.getHistorySuccess(res));
  } catch (error) {
    const { message } = error as unknown as AxiosError;
    yield put(actions.getHistoryFailed(message));
  }
}
export function* loginPageSaga() {
  yield takeLatest(actions.getHistory.type, handleGetHistory);
}
