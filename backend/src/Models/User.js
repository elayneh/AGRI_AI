// import mongoose, { Document, Schema } from "mongoose";
// import bcrypt from "bcrypt";
// import validator from "validator";
// import crypto from "crypto";

// const userSchema = new Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     validate: {
//       validator: (value) => validator.isEmail(value),
//       message: "{VALUE} is not a valid email address.",
//     },
//   },
//   password: { type: String, required: true },
//   passwordChangedAt: { type: Date },
//   passwordResetToken: { type: String },
//   passwordResetTokenExpired: { type: Date },
//   role: { type: String, default: "user" },
// });

// userSchema.methods.comparePasswordInDb = async function (password, passwordInDb) {
//   return await bcrypt.compare(password, passwordInDb);
// }

// userSchema.methods.createPasswordResetToken = function () {
//   const resetToken = crypto.randomBytes(32).toString("hex");
//   this.passwordResetToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");
//   this.passwordResetTokenExpired = new Date(Date.now() + 2 * 60 * 60 * 1000);

//   return resetToken;
// };

// const User = mongoose.model("User", userSchema);

// const initializeAdmin = async () => {
//   const adminExists = await User.exists({ role: { $regex: /^admin$/i } });
//   const password = "admin";
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);
//   if (!adminExists) {
//     await User.create({
//       firstName: "Admin",
//       lastName: "Admin",
//       email: "admin@gmail.com",
//       password: hashedPassword,
//       role: "admin",
//     });
//   }
// };

// initializeAdmin();

// export default User;
