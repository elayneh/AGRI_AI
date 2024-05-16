import { modelNames } from "../../Utils/Constants/models.js";
import httpStatus from "http-status";
import {
  generateHashedPassword,
  generateJwtToken,
  isnewPasswordoldPasswordMatch,
  isPasswordConfirmPasswordMatched,
} from "../../Utils/utils.js";
import APIError from "../../Utils/errors/APIErrorHandler.js";
import crypto from "crypto";

export async function createUserAccount(userData, res) {
  const { email, password, confirmPassword } = userData;
  try {
    if (!isPasswordConfirmPasswordMatched(password, confirmPassword)) {
      throw new APIError(
        "Password and confirm password do not match",
        httpStatus.BAD_REQUEST
      );
    }

    const existingUser = await this.model(modelNames.users)
      .findOne({ email })
      .select("+password");
    console.log(existingUser);
    if (existingUser) {
      throw new APIError(
        "A user already exists with this email.",
        httpStatus.CONFLICT
      );
    }

    const hashedPassword = await generateHashedPassword(password);
    userData.password = hashedPassword;

    const createdUser = await this.model(modelNames.users).create(userData);
    const token = generateJwtToken(createdUser._id);

    const cleanUser = {
      _id: createdUser._id,
      fullName: createdUser.fullName,
      email: createdUser.email,
      phoneNumber: createdUser.phoneNumber,
      token: token,
    };

    // res.cookie("jwt", token, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "None",
    //   maxAge: parseInt(process.env.TOKEN_EXP),
    // });
    return cleanUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function authenticateUser(email, password) {
  try {
    const user = await this.model(modelNames.users)
      .findOne({ email, active: true })
      .select("+password");

    if (
      !user ||
      !(await isnewPasswordoldPasswordMatch(password, user.password))
    ) {
      throw new APIError(
        "Incorrect email or password",
        httpStatus.UNAUTHORIZED
      );
    }

    const cleanUser = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };

    return cleanUser;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
}

export async function getUserById(userId) {
  try {
    const currentUser = await this.model(modelNames.users).findById({
      _id: userId,
    });
    if (currentUser) return currentUser;
    else return null;
  } catch (error) {
    console.log(`Get user by id errror: ${error}`);
    next(error);
  }
}

export async function getAllUsers() {
  try {
    const allUsers = await this.model(modelNames.users).find({});
    return allUsers;
  } catch (error) {
    console.error(`ERROR: ${error}`);
    if (!(error instanceof APIError))
      throw new APIError(
        "Fail to fetch users",
        httpStatus.INTERNAL_SERVER_ERROR
      );
    throw error;
  }
}

export async function createPasswordResetToken(user) {
  try {
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.passwordResetToken = hashedToken;
    user.passwordResetTokenExpired = new Date(Date.now() + 3 * 60 * 60 * 1000);
    await user.save({ validateBeforeSave: false });
    return resetToken;
  } catch (error) {
    console.log(`ERROR: ${error}`);
    if (!(error instanceof APIError))
      throw new APIError(
        "Can't generate reset token",
        httpStatus.INTERNAL_SERVER_ERROR
      );
    throw error;
  }
}

// export async function getSinglestewardAdmin(stewardId) {
//   try {
//     const steward = await this.model(modelNames.steward).findById(stewardId);
//     const {
//       password,
//       __v,
//       //   termsAndLicense,
//       //   recaptchaVerification,
//       role,
//       ...stewardWithoutPassword
//     } = user._doc;
//     return stewardWithoutPassword;
//   } catch (error) {
//     if (error instanceof APIError) throw error;
//     else {
//       throw new APIError(
//         "Fail to fetch a steward",
//         httpStatus.INTERNAL_SERVER_ERROR
//       );
//     }
//   }
// }
