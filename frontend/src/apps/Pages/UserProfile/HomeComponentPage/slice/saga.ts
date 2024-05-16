import { put, takeLatest } from "redux-saga/effects";
import { loginPageActions as actions } from ".";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { makeCall } from "../../../../API";
import { homePageSuccessType, submitImageTypes } from "./types";
import { apiRoute } from "../../../../../utils/routes/constants";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* handleImageSubmit(action: PayloadAction<submitImageTypes>) {
  const file = action.payload.file;
  const formData = new FormData();
  formData.append("userId", action.payload.userId);
  if (action.payload.suggestion) {
    formData.append("suggestion", action.payload.suggestion);
  }
  if (file) {
    formData.append("files", file);
  }
  try {
    const res: homePageSuccessType = yield makeCall({
      route: `${apiRoute.users}${apiRoute.submitImage}`,
      method: "POST",
      isSecureRoute: true,
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    yield put(actions.getImageSubmitSuccess(res.message));
  } catch (error) {
    const { message } = error as unknown as AxiosError;
    yield put(actions.getImageSubmitFailed(message));
  }
}
export function* loginPageSaga() {
  yield takeLatest(actions.getImageSubmit.type, handleImageSubmit);
}
