export interface resetPasswordComponentTypes {
  handleCredentials: (values: submitValuesType) => void;
}
type submitValuesType = {
  resetToken: string;
  password: string;
  confirmPassword: string;
};
