import mongoose from "mongoose";
import * as staticFunctions from "./statics.js";
import PredictModel from "./schema.js";
import { modelNames } from "../../Utils/Constants/models.js";

PredictModel.static(staticFunctions);
const Predict = mongoose.model(modelNames.predict, PredictModel);

export default Predict;