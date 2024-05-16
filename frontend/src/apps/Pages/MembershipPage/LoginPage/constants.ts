import { credentialsTypes } from "./slice/types";

export const initialState: credentialsTypes = {
  credentials: {
    email: "",
    password: "",
  },
  isLoading: false,
  isAuthenticated: false,
  authCredentials: {
    fullName: "",
    email: "",
    phoneNumber: "",
    _id: "",
    token: "",
  },
  errorMessage: "",
};
