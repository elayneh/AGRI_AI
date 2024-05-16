import { useDispatch } from "react-redux";
import UserProfilePage from "../../../Components/UserProfile";
import { useHomePageSlice } from "./slice";
import { useSelector } from "react-redux";
import {
  selectDiseaseTitle,
  selectPredictedDisease,
} from "./slice/selector";
import axios, { AxiosError } from "axios";
import { API_PYTHON_ROUTE, API_ROUTE } from "../../../../utils/constants";

export const HomeComponentPage = () => {
  const userId = localStorage.getItem("id");
  const { actions } = useHomePageSlice();
  const dispatch = useDispatch();
  const predictedDisease = useSelector(selectPredictedDisease);
  const diseaseTitle = useSelector(selectDiseaseTitle);
  const handleImageSubmit = async (value: File) => {
    try {
      const formData = new FormData();
      formData.append("file", value);

      const response = await axios.post(
        `${API_PYTHON_ROUTE}/predict`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const { predicted_disease } = response.data;
        const responseResult = await axios.post(
          `${API_ROUTE}/api/users/openai`,
          {
            prompt: `what does mean when wheat is ${predicted_disease} `,
          }
        );
        dispatch(actions.setDiseaseTitle(predicted_disease));
        dispatch(
          actions.getImagePredictionSuccess(responseResult.data.completion)
        );
        dispatch(
          actions.getImageSubmit({
            file: value,
            userId: userId as string,
            suggestion: responseResult.data.completion,
          })
        );
      } else {
        // Handle unexpected response status
        console.error(
          "Prediction request failed with status:",
          response.status
        );
        dispatch(
          actions.getImagePredictionFailure("Prediction request failed")
        );
      }
    } catch (error) {
      const errorMessage =
        (error as AxiosError).message || "Prediction request failed";
      console.error("Prediction request failed:", errorMessage);
      dispatch(actions.getImagePredictionFailure(errorMessage));
    }
  };
  return (
    <UserProfilePage
      handleImageSubmit={handleImageSubmit}
      diseaseTitle={diseaseTitle}
      predictedDisease={predictedDisease}
    />
  );
};
