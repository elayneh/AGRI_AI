import { resetPasswordCredentialsTypes } from "./slice/types";

export const initialState: resetPasswordCredentialsTypes = {
  resetPasswordCredentials: {
    password: "",
    confirmPassword: "",
    resetToken: ""
  },
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
};
