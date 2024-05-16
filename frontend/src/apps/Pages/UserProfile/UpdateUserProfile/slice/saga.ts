import { put, takeLatest } from "redux-saga/effects";
import { updateUserProfileActions as actions } from ".";
import { apiRoute } from "../../../../../utils/routes/constants";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { updateUserProfilePageTypes } from "./types";
import { makeCall } from "../../../../API";
import { authCredentialTypes } from "../../../MembershipPage/LoginPage/slice/types";

function* handleUpdateUserProfile(
  action: PayloadAction<updateUserProfilePageTypes>
) {
  const formData = new FormData();
  // const files = action.payload.uploadedFiles;

  // Append data fields to the formData object
  formData.append("email", action.payload.email);
  formData.append("firstName", action.payload.firstName);
  formData.append("lastName", action.payload.lastName);
  formData.append("phoneNumber", action.payload.phoneNumber);
  formData.append("physicalLocation", action.payload.physicalLocation);
  formData.append("gender", action.payload.gender);

  // Append uploaded files (assuming action.payload.uploadedFiles is an array of File objects)
  // if (files) {
  //   for (const file of files) {
  //     formData.append("files", file);
  //   }
  // }
  try {
    const res: authCredentialTypes = yield makeCall({
      route: `${apiRoute.users}${apiRoute.updateUserProfile}`,
      method: "PATCH",
      isSecureRoute: true,
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const userProfile: updateUserProfilePageTypes = yield makeCall({
      route: `${apiRoute.users}${apiRoute.getUserByID}`,
      method: "GET",
      isSecureRoute: true,
    });
    yield put(actions.fetchUserProfileRequest(userProfile));

    yield put(actions.updateUserProfileSuccess(res));
  } catch (error) {
    const { message } = error as unknown as AxiosError;
    yield put(actions.updateUserProfileFailed(message));
  }
}

export function* updateUserProfilePageSaga() {
  yield takeLatest(actions.getUpdateUserProfile, handleUpdateUserProfile);
}
