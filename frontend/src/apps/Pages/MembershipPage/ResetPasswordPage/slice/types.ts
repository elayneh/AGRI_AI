export interface resetPasswordPageTypes {
  resetToken: string;
  password: string;
  confirmPassword: string;
}

export type resetPasswordCredentialsTypes = {
  resetPasswordCredentials: resetPasswordPageTypes;
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
