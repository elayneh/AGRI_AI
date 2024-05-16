import Predict from "./index.js";

export async function makeImageUpload(imageData) {
  try {
    const prediction = await Predict.create({
      user: imageData.userId,
      image: imageData.image,
      suggestion: imageData.suggestion,
    });
    console.log('++++++++++++',prediction)
    return { message: "Image is created successfully" };
  } catch (error) {
    throw error;
  }
}
