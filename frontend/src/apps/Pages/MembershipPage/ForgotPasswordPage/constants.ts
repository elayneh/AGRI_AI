import { forgotPasswordCredentialsTypes } from "./slice/types";

export const initialState: forgotPasswordCredentialsTypes = {
  credentials: {
    email: "",
  },
  isLoading: false,
  isAuthenticated: false,
  errorMessage: "",
  resetPasswordToken: {
    resetToken: ""
  }
};
