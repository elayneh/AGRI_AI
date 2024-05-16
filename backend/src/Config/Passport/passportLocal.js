import passportLocal from "passport-local";
import User from "../../Models/Users/index.js";

const strategy = new passportLocal.Strategy(
  { usernameField: "email", passwordField: "password" },
  async (email, password, done) => {
    try {
      const authenticatedUser = await User.authenticateUser(email, password);
      return done(false, authenticatedUser);
    } catch (error) {
      return done(error, null);
    }
  }
);

export default strategy;
