import { authCredentialTypes } from "../../../MembershipPage/LoginPage/slice/types";

export interface updateUserProfilePageTypes {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  experience: string;
  profilePicture: string;
  physicalLocation: string;
}

export type updateUserProfileCredentials = {
  isLoading: boolean;
  authCredentials: authCredentialTypes;
  updateUserProfileCredentials: updateUserProfilePageTypes;
  errorMessage: string;
  isAuthenticated: boolean;
};
