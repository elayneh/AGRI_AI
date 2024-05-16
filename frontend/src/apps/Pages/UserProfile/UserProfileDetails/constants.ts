import { userProfileDetailCredentialsTypes } from "./slice/types";

export const initialState: userProfileDetailCredentialsTypes = {
  isLoading: false,

  errorMessage: "",
  userProfileDetailCredentials: {
    firstName: "",
    lastName: "",
    email: "",
    profilePicture: "",
    phoneNumber: "",
    physicalLocation: "",
    experience: "",
    _id: "",
    token: "",
    role: ""
  },
  isAuthenticated: false
};
