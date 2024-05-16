import User from "../models/User.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

export const userVerification = async (
  req,
  res,
  next
) => {
  console.log(req.cookies);
  console.log(req.headers);
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.SECRETE_KEY ?? "defaultKey"
    );
    const user = await User.findOne({ email: decodedToken.email });

    if (user) {
      return res.json({ status: true, existsUser: user.email });
    } else {
      return res.json({ status: false });
    }
  } catch (err) {
    console.error("Error during user verification:", err);
    return res.json({ status: false });
  }
};

