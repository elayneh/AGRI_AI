export interface submitImageTypes {
  file: File;
}

export type UserProfileComponentTypes = {
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  history: historyTypes[];
  imageFile:any;
};
export type historyTypes = {
  image:string;
  user:string;
  suggestion:string;
  createdAt:string;
  updatedAt:string;
};
export type homePageSuccessType = {
  message: string;
};

