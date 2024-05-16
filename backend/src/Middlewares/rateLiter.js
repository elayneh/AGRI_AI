import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 1000,
  message: "Request entity too large, try 15 minute later",
  skipSuccessfulRequests: true,
  statusCode: 429,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

export const logginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,
  message: "Too many login attemps, please try again later ",
  skipSuccessfulRequests: true,
  statusCode: 429,
});
