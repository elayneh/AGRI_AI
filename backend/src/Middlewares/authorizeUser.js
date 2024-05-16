import httpStatus from "http-status";
import APIError from "../Utils/errors/APIErrorHandler.js";
import passport from "passport";
import fileUploader from "express-fileuploader";
import ac from "../Config/accessController.js";
import { join } from "path";
import fs from "fs";

// export const multiFileUploader = async (req, res, next) => {
//   const uploadFolder = "./../../public/fileUploads";
//   try {
//     fileUploader()(req, res, async (err) => {
//       if (req.files) {
//         let files = Array.isArray(req.files.files)
//           ? req.files.files
//           : [req.files.files];
//         await Promise.all(
//           files.map(async (file) => {
//             console.log("Processing file: ", file);
//             if (file && file.name) {
//               const filePath = join(process.cwd(), uploadFolder, file.name);
//               console.log("Saving file to: ", filePath);
//               if (!fs.existsSync(uploadFolder)) {
//                 fs.mkdirSync(uploadFolder, { recursive: true });
//               }

//               await file.mv(filePath);
//             } else {
//               console.error("Invalid file object:", file);
//             }
//           })
//         );
//       }
//       next();
//     });
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };

const grantAccess = (action, resource) => async (req, res, next) => {
  try {
    const permission = ac.can(req.user.role)[action](resource);
    if (!permission.granted) {
      return res.status(401).json({
        error: "You didn't have enough permission to perform this action",
      });
    }
  } catch (error) {
    next(error);
  }
};

const isUserAuthenticated = (req, res, next) => {
  // try {
  //   const token = req.cookies.jwt;
  //   if (!token) {
  //     throw new APIError(
  //       "Unauthorized access denied, Please login first",
  //       httpStatus.UNAUTHORIZED
  //     );
  //   }
  //   // Set token in headers for Passport JWT authentication
  //   req.headers.authorization = `Bearer ${token}`;
  //   return passport.authenticate("jwt", { session: false }, (error, user) => {
  //     if (error || !user) {
  //       throw new APIError(
  //         "Unauthorized access denied, Please login first",
  //         httpStatus.UNAUTHORIZED
  //       );
  //     }
  //     req.user = user;
  //     next();
  //   })(req, res, next);
  // } catch (error) {
  //   next(error);
  // }
  if (req.headers && !req.headers.authorization) {
    const missingTokenError = new APIError(
      "Token not found! Provide credential",
      httpStatus.BAD_REQUEST
    );
    return next(missingTokenError);
  }
  return passport.authenticate("jwt", (error, user, message) => {
    if (error || !user) {
      throw new APIError(message, httpStatus.UNAUTHORIZED);
    }
    req.user = user;
    return next();
  })(req, res, next);
};
export { grantAccess, isUserAuthenticated };
