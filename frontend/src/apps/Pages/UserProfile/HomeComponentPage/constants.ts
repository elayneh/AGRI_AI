import { HomeComponentPageTypes } from "./slice/types";

export const initialState: HomeComponentPageTypes = {
    isLoading: false,
    errorMessage: "",
    successMessage: "",
    predictedDisease: '',
    diseaseTitle: ""
};