import { Schema, Types } from "mongoose";

const UserModel = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    phoneNumber: { type: String, required: true },
    passwordResetTokenExpired: { type: Date, default: undefined },
    passwordResetToken: { type: String, default: undefined },
    passwordChangedAt: { type: Date, default: undefined },
    active: { type: Boolean, default: true, select: false },
  },
  { timestamps: true }
);

UserModel.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});
export default UserModel;
