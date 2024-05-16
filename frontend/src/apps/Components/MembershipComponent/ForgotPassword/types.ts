export interface forgotPasswordComponentTypes {
  handleCredentials: (values: submitValuesType) => void;
}
type submitValuesType = { email: string };
