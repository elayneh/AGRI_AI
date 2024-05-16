import { put, takeLatest } from "redux-saga/effects";
import { userProfileDetailPageActions as actions } from ".";
import { AxiosError } from "axios";
import { makeCall } from "../../../../API";
import { userProfileDetailCredentials } from "./types";
import { apiRoute } from "../../../../../utils/routes/constants";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* handleUserProfileDetail() {
  try {
    const res: userProfileDetailCredentials = yield makeCall({
      route: `${apiRoute.users}${apiRoute.getUserByID}`,
      method: "GET",
      isSecureRoute: true,
    });
    yield put(actions.getUserProfileDetailSuccess(res));
  } catch (error) {
    const { message } = error as unknown as AxiosError;
    yield put(actions.getUserProfileDetailFailed(message));
  }
}
export function* userProfileDetailPageSaga() {
  yield takeLatest(actions.getUserProfileDetail.type, handleUserProfileDetail);
}
