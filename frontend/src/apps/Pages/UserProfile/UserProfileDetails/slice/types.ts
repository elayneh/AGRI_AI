export type userProfileDetailCredentialsTypes = {
  isLoading: boolean;
  userProfileDetailCredentials: userProfileDetailCredentials;
  errorMessage: string;
  isAuthenticated: boolean;
};

export type userProfileDetailCredentials = {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  phoneNumber: string;
  physicalLocation: string;
  experience: string;
  _id: string;
  token: string;
  role: string;
};
