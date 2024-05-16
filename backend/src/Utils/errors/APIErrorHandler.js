import httpStatus from "http-status";
import AppError from "./CustomErrorHandler.js";
/**
 * @extends AppError
 */

class APIError extends AppError {
  constructor(
    message = "Unknown error occurred",
    status = httpStatus.INTERNAL_SERVER_ERROR
  ) {
    super(message, status);
  }
}

export default APIError;
