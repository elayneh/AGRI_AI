export interface updateUserProfileComponentTypes {
  handleCredentials: (values: submitValuesType) => void;
}

type submitValuesType = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  experience: string;
  profilePicture: string;
  physicalLocation: string;
};
