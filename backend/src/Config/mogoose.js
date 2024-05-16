import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.LOCAL_MONGO_URI;
    if (!mongoUri) {
      throw new Error("MongoDB URI not found in environment variables.");
    }
    await mongoose.connect(mongoUri);
    console.log("Mongodb Connected Successfully!!");
  } catch (error) {
    console.log(error);
    throw error;
  }
};
