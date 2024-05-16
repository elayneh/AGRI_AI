import { baseErrors, TErrorCodes } from "./ErrorCodes";

class APIError extends Error {
  code: string = baseErrors.UNKNOWN;

  constructor(code: TErrorCodes = baseErrors.UNKNOWN, message?: string) {
    super(message);
    this.code = code;
  }
}

export default APIError;
