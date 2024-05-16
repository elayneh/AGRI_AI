import { HistoryComponentPageTypes } from "./slice/types";

export const initialState: HistoryComponentPageTypes = {
    isLoading: false,
    errorMessage: "",
    successMessage: "",
    history:[],
};