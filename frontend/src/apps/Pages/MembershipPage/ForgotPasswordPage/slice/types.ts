export interface forgotPasswordPageTypes {
  email: string;
}

export type resetPasswordToken = {
  resetToken: string;
};

export type forgotPasswordCredentialsTypes = {
  credentials: forgotPasswordPageTypes;
  isLoading: boolean;
  errorMessage: string;
  isAuthenticated: boolean;
  resetPasswordToken: resetPasswordToken;
};
