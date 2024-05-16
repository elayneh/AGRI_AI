import { updateUserProfileCredentials } from "./slice/types";

export const initialState: updateUserProfileCredentials = {
  isLoading: false,
  isAuthenticated: false,
  authCredentials: {
    phoneNumber: "",
    _id: "",
    token: "",
    fullName: "",
    email: ""
  },
  errorMessage: "",
  updateUserProfileCredentials: {
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gender: "",
    experience: "",
    physicalLocation: "",
    profilePicture: ""
  },
};
