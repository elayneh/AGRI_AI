export interface loginPageTypes {
  email: string;
  password: string;
}

export type credentialsTypes = {
  credentials: loginPageTypes;
  isLoading: boolean;
  authCredentials: authCredentialTypes;
  errorMessage: string;
  isAuthenticated: boolean;
};

export type authCredentialTypes = {
  fullName: string;
  _id: string;
  email: string;
  phoneNumber: string;
  token: string;
};
