export interface SignUpComponentProps {
  handleSubmit: (values: submitTypes) => void;
}

export type submitTypes = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  fullName?: string;
  phoneNumber?: string;
};
