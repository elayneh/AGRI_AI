import passport from "passport";
import httpStatus from "http-status";
import APIError from "../Utils/errors/APIErrorHandler.js";
import User from "../Models/Users/index.js";
import { createPasswordResetToken } from "../Models/Users/statics.js";
import {
  isnewPasswordoldPasswordMatch,
  generateHashedPassword,
  isPasswordConfirmPasswordMatched,
  sendEmail,
  filteredBbjToUpdate,
  generateJwtToken,
} from "./../Utils/utils.js";
import crypto from "crypto";
import dotenv from "dotenv";
import Predict from "../Models/predict/index.js";
dotenv.config();

export const createUserController = async (req, res, next) => {
  try {
    const user = await User.createUserAccount(req.body, res);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const loginUserController = (req, res, next) => {
  passport.authenticate("local", { session: false }, (error, user, message) => {
    try {
      if (error || !user) {
        throw error || message || new Error("Incorrect email or password");
      }
      const expiresIn = parseInt(process.env.TOKEN_EXP);
      const token = generateJwtToken(user._id, { expiresIn });
      user.token = token;
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: expiresIn,
      });
      res.json({
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        _id: user._id,
        token: user.token,
      });
    } catch (error) {
      console.log("Error: ", error);
      return res.status(401).json({
        status: "error",
        message: error.message || "Unauthorized",
      });
    }
  })(req, res, next);
};

export const updateUserProfileController = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      filteredBbjToUpdate(req.body, "fullName", "email", "phoneNumber"),
      {
        runValidators: true,
        new: true,
      }
    );

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Get all users
export const getAllUsersController = async (req, res, next) => {
  try {
    const allUsers = await User.getAllUsers();
    allUsers
      ? res.status(200).json({
          status: "success",
          message: "All users are fetched properly",
          numberOfUsers: allUsers.length,
          data: {
            allUsers,
          },
        })
      : res.status(200).json({
          status: "success",
          message: "There is not user in the database",
        });
  } catch (error) {
    console.error(`ERROR: ${error}`);
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const token = req.headers.authorization.split(" ")[1];
    const currentUser = await User.findById({ _id });
    currentUser.token = token;
    const { createdAt, updatedAt, passwordChangedAt, __v, ...filteredUser } =
      currentUser._doc;
    if (currentUser) {
      res.json({
        user: filteredUser,
      });
    } else {
      res.json({ message: "Cann't fetch the user with the given user id" });
    }
  } catch (error) {
    console.log(`Get user by id errror: ${error}`);
    next(error);
  }
};
export const getAllUserHistoryController = async (req, res, next) => {
  try {
    const history = await Predict.find({ user: req.body.userId });
    res.json(history);
  } catch (error) {
    console.log(`Get user by id errror: ${error}`);
    next(error);
  }
};
// Delete user by id
export const deleteUserAccount = async (req, res, next) => {
  try {
    const deletedUser = await User.findOneAndUpdate(req.user._id, {
      active: false,
      new: true,
    });
    if (!deletedUser) {
      return new APIError("Unauthorized request", httpStatus.UNAUTHORIZED);
    }
    res.cookie("jwt", "", { maxAge: 0, httpOnly: true });
    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
      data: { deletedUser },
    });
  } catch (error) {
    if (!(error instanceof APIError)) {
      next(
        new APIError(
          err.message || "An error occurred while processing delete request",
          httpStatus.INTERNAL_SERVER_ERROR
        )
      );
    }
    next(error);
  }
};
// forgot password controller and return the password reset token
export const forgotUserPasswordController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email, active: true });

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "We couldn't find the user with the given email.",
      });
    }
    const resetToken = await createPasswordResetToken(user);

    const resetUrl = `${process.env.FRONT_END_URI}/password_reset/${resetToken}`;
    const message = `Reset Password\n\nA password reset event has been triggered. The password reset window is limited to two hours.
    \nIf you do not reset your password within two hours, you will need to submit a new request.\nTo complete the password reset process, visit the link bellow\n\n${resetUrl}`;

    // Send email
    await sendEmail({
      email: user.email,
      subject: "Password reset received",
      message: message,
    });

    res.status(200).json({
      status: "success",
      message:
        "Password reset token sent successfully. Please check your email.",
    });
  } catch (error) {
    if (!(error instanceof APIError)) {
      next(
        new APIError(
          err.message ||
            "An error occurred while processing forgot password request",
          httpStatus.INTERNAL_SERVER_ERROR
        )
      );
    }
    next(error);
  }
};

//  update user password controller
export const updateUserPasswordController = async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  try {
    const user = await User.findById({ _id: req.user._id }).select("+password");
    if (!(await isnewPasswordoldPasswordMatch(currentPassword, user.password)))
      return next(
        new APIError(
          "Incorrect password, Please inter correct password",
          httpStatus.UNAUTHORIZED
        )
      );
    if (!isPasswordConfirmPasswordMatched(newPassword, confirmPassword))
      return next(
        new APIError("Password didn't match", httpStatus.UNAUTHORIZED)
      );
    const hashedPassword = await generateHashedPassword(newPassword);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({
      status: "success",
      message: "Password updated successfully!",
    });
  } catch (error) {
    console.log(`ERROR: ${error}`);
    next(error);
  }
};

// reset user password controller
export const resetUserPasswordController = async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  // Check if new password and confirm password match
  if (!isPasswordConfirmPasswordMatched(password, confirmPassword))
    throw new APIError("Password didn't match", httpStatus.UNAUTHORIZED);
  try {
    const resetToken = crypto
      .createHash("sha256")
      .update(req.params.password_reset_token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: resetToken,
      passwordResetTokenExpired: { $gt: Date.now() },
    });

    if (!user) {
      throw new APIError(
        "Invalid password reset token, please try again",
        httpStatus.BAD_REQUEST
      );
    }

    const hashedPassword = await generateHashedPassword(password);

    user.password = hashedPassword;
    user.passwordResetTokenExpired = undefined;
    user.passwordResetToken = undefined;
    user.passwordChangedAt = Date.now();

    await user.save();
    res.status(200).json({
      status: "success",
      message: "Password reset successfully",
    });
  } catch (error) {
    next(error);
  }
};

// User logout controller
export const logoutUserController = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    console.log("Cookie: ", cookies);
    if (!cookies?.jwt)
      return next(new APIError("No logged in content", httpStatus.NO_CONTENT));
    console.log("Cookie: ", cookies);

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.json({
      status: "success",
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const uploadPredictImageController = async (req, res, next) => {
  try {
    console.log("Received files:", req.files); // Log the structure of req.files
    let filesURL;

    if (req.files) {
      // Adjust file access based on the structure of req.files
      filesURL = Array.isArray(req.files.files)
        ? req.files.files.map((file) => file.name)
        : Object.values(req.files).map((file) => file.name);
    }
    const createdImage = await Predict.makeImageUpload({
      ...req.body,
      image: filesURL[0],
    });
    res.json(createdImage);
  } catch (error) {
    next(error);
  }
};
// Protect user
// export const isAutherized = async (req, res, next) => {
//   const getToken = req.headers.authorization;
//   let token;
//   if (getToken && getToken.startWith("Bearer")) {
//     token = getToken.split(" "[1]);
//   }
//   if (!token) {
//     next(new APIError("You are not loggedin", httpStatus.UNAUTHORIZED));
//   }
//   // token validation
//   const decodedToken = await util.promisify(jwt.verify)(
//     token,
//     process.env.SECRET_KEY
//   );
//   const user = await User.findById(decodedToken._id);
//   if (!user) {
//     next(
//       new APIError(
//         "The user with the provided token does not exit",
//         httpStatus.UNAUTHORIZED
//       )
//     );
//   }
//   const isPasswordChangedRecently = await user.passwordChangedAt(
//     decodedToken.iat
//   );
//   if (isPasswordChangedRecently) {
//     return next(
//       new APIError(
//         "The password has been changed recently, Please login again",
//         httpStatus.BAD_REQUEST
//       )
//     );
//   }
//   req.user = user;
//   next();
// };
