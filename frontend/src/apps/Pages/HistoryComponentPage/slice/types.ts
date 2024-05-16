export interface submitImageTypes {
  file: File;
}

export type HistoryComponentPageTypes = {
  isLoading: boolean;
  errorMessage: string;
  successMessage: string;
  history: historyTypes[];
};
export type historyTypes = {
  image:string;
  user:string;
  suggestion:string;
  createdAt:string;
  updatedAt:string;
  _id:string;
  __v:number;
};
export type homePageSuccessType = {
  message: string;
};

