import { credentialsTypes } from "../LoginPage/slice/types";

export const initialState: credentialsTypes = {
  credentials: {
    email: "",
    password: "",
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
