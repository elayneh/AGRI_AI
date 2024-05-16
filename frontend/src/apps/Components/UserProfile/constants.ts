import { UserProfileComponentTypes } from "./slice/types";

export const initialState: UserProfileComponentTypes = {
    isLoading: false,
    errorMessage: "",
    successMessage: "",
    history: [],
    imageFile: undefined
};
