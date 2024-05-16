import { Schema, Types } from "mongoose";
import { modelNames } from "../../Utils/Constants/models.js";

const PredictModel = new Schema(
  {
    image: {
      type: String,
    },
    user: { type: Types.ObjectId, ref: `${modelNames.users}` },
    suggestion: { type: String },
  },
  { timestamps: true }
);

export default PredictModel;
