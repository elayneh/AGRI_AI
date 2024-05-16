import { body, param, query } from "express-validator";

export const createAccountValidator = () => [
  body("fullName").isString().withMessage("A valid name is required"),
  body("email").isEmail().withMessage("A Valid Email is required."),
  body("phoneNumber")
    .isString()
    .custom((phone) => {
      const regex = /((^(2517|2519|07|09)\d{3})-?\d{5})/;
      return regex.test(phone);
    })
    .isLength({ min: 10, max: 12 })
    .withMessage(
      "Phone number is required and must be valid. valid codes are 2517/07 or 2519/09"
    ),
  body("password")
    .isString()
    .custom((password) => {
      const regex = /((^))/;
      return regex.test(password);
    })
    .isLength({ min: 8, max: 32 })
    .withMessage("Password should be strong"),
  body("confirmPassword").isString().withMessage("Confirm password required."),
];

export const loginAccountValidator = () => [
  body("email").isEmail().withMessage("Incorrect email or password"),
  body("password").isString().withMessage("Incorrect email or password"),
];

export const getAllUserHistoryValidator = () => [
  body("userId").isMongoId().withMessage("User Id is required."),
];
export const getUserByIDValidator = () => [];
export const getAllUsersValidator = () => [];
export const forgotUserPasswordValidator = () => [
  body("email")
    .isString()
    .withMessage(
      "Could you please provide the email associated with your account for resetting the password?"
    ),
];
export const resetPasswordValidator = () => [
  body("password").isString().withMessage("Please provide new password"),
  body("confirmPassword").isString().withMessage("Confirm password required"),
];
export const updateUserPasswordValidator = () => [
  body("currentPassword")
    .isString()
    .withMessage("Current password is required"),
  body("newPassword").isString().withMessage("New password is required"),
  body("confirmPassword").isString().withMessage("Confirm password required"),
];
