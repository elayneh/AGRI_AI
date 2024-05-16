// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import validator from "validator";
// import { asyncErrorHandler } from "../Utils/errors/asyncErrorHandler.js";
// import { createSecreteToken } from "../Utils/authorization.js";
// import User from "../Models/User.js";
// import crypto from "crypto";
// import {
//   comparePassword,
//   generateHashedPassword,
//   isPasswordConfirmPasswordMatched,
//   sendEmail,
// } from "../Utils/utils.js";
// import APIError from "../Utils/errors/APIErrorHandler.js";
// import httpStatus from "http-status";

// const signinToken = (id) => {
//   return jwt.sign({ id }, process.env.SECRET_KEY, {
//     expiresIn: process.env.LOGIN_EXPIRES,
//   });
// };

// const createSendResponse = (user, statusCode, res) => {
//   const token = signinToken(user._id);
//   res.status(statusCode).json({
//     status: "success",
//     token,
//     data: { user },
//   });
// };
// export const register = asyncErrorHandler(async (req, res, next) => {
//   try {
//     const { firstName, lastName, email, password } = req.body;

//     if (!firstName || !lastName || !email || !password) {
//       return res
//         .status(400)
//         .json({ message: "Please fill in all required fields" });
//     }
//     if (!validator.isEmail(email)) {
//       return res
//         .status(400)
//         .json({ message: "Email is not valid email address" });
//     }
//     if (password.length < 8) {
//       return res
//         .status(400)
//         .json({ message: "Password must be at least 8 characters" });
//     }
//     const existsUser = await User.findOne({ email });
//     if (existsUser) {
//       return res.status(400).json({ message: "Email already in use" });
//     }
//     const hashedPassword = await generateHashedPassword(pass);

//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//     });
//     if (!newUser) {
//       return res.status(400).json({ message: "Invalid user data" });
//     }
//     await newUser.save();

//     const { _id } = newUser;
//     const token = createSecreteToken(_id);
//     res.cookie("token", token, { httpOnly: false });
//     const userData = {
//       firstName,
//       lastName,
//       email,
//       password: undefined,
//       token,
//     };
//     res.status(201).json({
//       message: "User registered successfully",
//       success: true,
//       userData,
//     });
//     next();
//   } catch (error) {
//     return next(new customErrorHandler("Internal Server Error", 500));
//   }
// });

// export const login = asyncErrorHandler(async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     if (!(email && password)) {
//       return res.status(400).json({ message: "Incorrect password or email" });
//     }

//     const existsUser = await User.findOne({ email });
//     if (!existsUser) {
//       return res.status(401).json({
//         message: "Incorrect email or password",
//       });
//     }
//     const isPasswordCorrect = await bcrypt.compare(
//       password,
//       existsUser.password
//     );
//     if (!isPasswordCorrect) {
//       return res.status(401).json({ message: "Incorrect password or email" });
//     }
//     createSendResponse(existsUser, 200, res);
//   } catch (err) {
//     return next(new customErrorHandler("Internal Server Error", 500));
//   }
// });

// export const resetPassword = asyncErrorHandler(async (req, res, next) => {
//   try {
//     const { password, confirmPassword } = req.body;
//     if (!isPasswordConfirmPasswordMatched(password, confirmPassword))
//       next(new APIError("Password didn't match", httpStatus.UNAUTHORIZED));
//     const resetToken = crypto
//       .createHash("sha256")
//       .update(req.params.password_reset_token)
//       .digest("hex");
//     const user = await User.findOne({
//       passwordResetToken: resetToken,
//       passwordResetTokenExpired: { $gt: Date.now() },
//     });

//     if (!user) {
//       return next(
//         new customErrorHandler(
//           "Password reset token is either invalid or expired",
//           400
//         )
//       );
//     }
//     const hashedPassword = await generateHashedPassword(password);
//     user.password = hashedPassword;
//     user.passwordResetTokenExpired = undefined;
//     user.passwordResetToken = undefined;
//     user.passwordChangedAt = Date.now();

//     // Save the updated user with validation
//     user.save({ validateBeforeSave: true });
//   } catch (err) {
//     const error = new customErrorHandler(
//       "Oops! some thing want wrong, try again",
//       400
//     );
//     return next(error);
//   }
// });

// export const forgotPassword = asyncErrorHandler(async (req, res, next) => {
//   // get user based on provided email
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) {
//     const error = new customErrorHandler(
//       "We couldn't find the user with the given email",
//       404
//     );
//     next(error);
//   }
//   // generate a random reset token
//   const resetToken = user.createPasswordResetToken();
//   await user.save({ validateBeforeSave: false });
//   // send the token to the user email
//   const resetUrl = `${req.protocol}://${req.get(
//     "host"
//   )}/api/users / resetPassword / ${resetToken}`;
//   const message = `Reset Password\n\n
//   A password reset event has been triggered.The password reset window is limited to two hours.\n
//   If you do not reset your password within two hours, you will need to submit a new request.\nTo complete the password reset process, visit the following link ${resetUrl} `;
//   try {
//     await sendEmail({
//       email: user.email,
//       subject: "Password reset received",
//       message: message,
//     });
//     res.status(200).json({
//       status: "success",
//       message: "Password reset email send successfully",
//     });
//   } catch (err) {
//     user.passwordResetToken = undefined;
//     user.passwordResetTokenExpired = undefined;
//     user.save({ validateBeforeSave: false });
//     return next(
//       new customErrorHandler(
//         "There are an error sending password reset email,\n\t\t\t Please try again later",
//         500
//       )
//     );
//   }
// });
// // Update password
// export const updatePassword = asyncErrorHandler(async (req, res, next) => {
//   // Get current user data from the database
//   const user = await User.findById(req.user._id).select("+password");
//   //Check if the supplied current password is correct
//   if (!(await comparePassword(req.body.currentPassword, user.password))) {
//     return next(
//       new customErrorHandler("The current password is not correct", 401)
//     );
//   }
//   //If the supplied password is correct, update the user password with new password
//   user.password = req.body.currentPassword;
//   await user.save();
//   // Login user and send JWT
//   createSendResponse(user, 200, res);
// });

// export const logout = async (req, res, next) => {
//   res.cookie("token", "", { httpOnly: false });
//   return res.status(200).json({ message: "User logged out successfully" });
// };
