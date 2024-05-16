import mongoose from "mongoose";
import * as staticFunctions from "./statics.js";
import UserModel from "./schema.js";
import { modelNames } from "../../Utils/Constants/models.js";

UserModel.static(staticFunctions);
const User = mongoose.model(modelNames.users, UserModel);

export default User;
