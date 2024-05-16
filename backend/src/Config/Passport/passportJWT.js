import { Strategy, ExtractJwt } from "passport-jwt";
import httpStatus from "http-status";
import dotenv from "dotenv";
import customErrorHandler from "../../Utils/errors/CustomErrorHandler.js";
import User from "../../Models/Users/index.js";
import jwt from "jsonwebtoken";
import APIError from "../../Utils/errors/APIErrorHandler.js";
dotenv.config();

const strategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
  },
  async (payload, done) => {
    try {
      const user = await User.findOne({ _id: payload._id });
      if (!user) {
        const NotFound = new APIError(
          "User not found",
          httpStatus.NOT_FOUND,
          true
        );

        return done(NotFound, false);
      }
      return done(false, user);
    } catch (error) {
      return done(error, null);
    }
  }
);

export default strategy;
