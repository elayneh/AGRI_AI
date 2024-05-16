export interface submitImageTypes {
  file:File;
  userId:string;
  suggestion?:string;
}

export type HomeComponentPageTypes = {
  isLoading: boolean;
  errorMessage: string;
  successMessage:string;
  predictedDisease:string;
  diseaseTitle:string;
};

export type homePageSuccessType = {
  message: string;
};
