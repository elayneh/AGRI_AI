import cors from "cors";
import dotenv from "dotenv";
import app from "./Config/express.js";
import InitiatePassport from "./Config/Passport/index.js";
import passport from "passport";
import { connectDb } from "./Config/mogoose.js";

dotenv.config();
InitiatePassport(passport);
app.use(passport.session());

const start = async () => {
  const port = process.env.PORT;
  const host = process.env.BASE_URL;

  app.options(
    cors({
      origin: "*",
    })
  );
  app.use(
    cors({
      origin: "*",
    })
  );
  const server = app.listen(port, () => {
    console.log(`Server running on ${host}:${port}`);
  });
  await connectDb();
};

start();
