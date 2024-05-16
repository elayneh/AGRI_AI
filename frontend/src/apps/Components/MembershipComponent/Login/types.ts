export interface loginComponentTypes {
  handleCredentials: (values: submitValuesType) => void;
}
type submitValuesType = { email: string; password: string };
