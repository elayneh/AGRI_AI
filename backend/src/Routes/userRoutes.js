import express from "express";
import errorParser from "../Utils/Validator/error.parser.js";
import {
  createAccountValidator,
  loginAccountValidator,
  getAllUsersValidator,
  forgotUserPasswordValidator,
  resetPasswordValidator,
  updateUserPasswordValidator,
  getUserByIDValidator,
  getAllUserHistoryValidator,
} from "../Utils/Validator/userValidator.js";
import {
  isUserAuthenticated,
  grantAccess,
} from "../Middlewares/authorizeUser.js";
import {
  createUserController,
  loginUserController,
  getAllUsersController,
  forgotUserPasswordController,
  resetUserPasswordController,
  updateUserPasswordController,
  updateUserProfileController,
  deleteUserAccount,
  logoutUserController,
  getUserById,
  uploadPredictImageController,
  getAllUserHistoryController,
} from "../Controller/userController.js";
import { logginLimiter } from "../Middlewares/rateLiter.js";
import { multiFileUploader } from "../Middlewares/index.js";
import axios from "axios";
import { openaiController } from "../Controller/openaiController.js";
const router = express.Router();
router.post("/openai", openaiController);
router.post(
  "/register",
  // createAccountValidator(),
  // errorParser,
  createUserController
);
router.post(
  "/login",
  logginLimiter,
  loginAccountValidator(),
  errorParser,
  loginUserController
);

router.get(
  "/getUserById",
  errorParser,
  isUserAuthenticated,
  getUserByIDValidator(),
  getUserById
);
router.get(
  "/getUsers",
  isUserAuthenticated,
  // grantAccess("readAny", "users"),
  errorParser,
  getAllUsersValidator(),
  getAllUsersController
);
router.post(
  "/forgotPassword",
  errorParser,
  forgotUserPasswordValidator(),
  forgotUserPasswordController
);
router.patch(
  "/resetPassword/:password_reset_token",
  resetPasswordValidator(),
  errorParser,
  resetUserPasswordController
);
router.patch(
  "/updateUserPassword",
  isUserAuthenticated,
  updateUserPasswordValidator(),
  errorParser,
  updateUserPasswordController
);

router.patch(
  "/updateUserProfile",
  isUserAuthenticated,
  errorParser,
  updateUserProfileController
);
router.delete(
  "/deleteUserAccount",
  isUserAuthenticated,
  errorParser,
  deleteUserAccount
);
router.post(
  "/getHistory",
  isUserAuthenticated,
  // grantAccess("readAny", "users"),
  getAllUserHistoryValidator(),
  errorParser,
  getAllUserHistoryController
);
router.post("/submitImage", multiFileUploader, uploadPredictImageController);
router.post("/logout", isUserAuthenticated, errorParser, logoutUserController);
export default router;
