import bcrypt from "bcrypt";
import APIError from "./errors/APIErrorHandler.js";
import httpStatus from "http-status";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const generateHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const generateJwtToken = (userID) => {
  try {
    const expiresIn = parseInt(process.env.TOKEN_EXP);
    const token = jwt.sign({ _id: userID }, process.env.SECRET_KEY, {
      expiresIn,
    });
    return token;
  } catch (error) {
    throw error;
  }
};

export const sendEmail = async (option) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Define email options
    const emailOptions = {
      from: `Belayneh getachew <belaynehgetachew@gmail.com>`,
      to: option.email,
      subject: option.subject,
      text: option.message,
    };

    // Send email
    await transporter.sendMail(emailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error(error);
    if (!(error instanceof APIError)) {
      throw new APIError(
        "Error sending email",
        httpStatus.INTERNAL_SERVER_ERROR
      );
    }
    throw error;
  }
};

export const isnewPasswordoldPasswordMatch = async (
  currentPassword,
  passwordInDb
) => {
  try {
    return await bcrypt.compare(currentPassword, passwordInDb);
  } catch (error) {
    throw error;
  }
};
export const isPasswordConfirmPasswordMatched = (password, ConfirmPassword) => {
  return password === ConfirmPassword;
};

export const filteredBbjToUpdate = (object, ...fieldsToUpdates) => {
  const newObject = {};
  Object.keys(object).forEach((prop) => {
    if (fieldsToUpdates.includes(prop)) newObject[prop] = object[prop];
  });
  return newObject;
};
