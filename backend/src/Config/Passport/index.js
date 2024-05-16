import localStrategy from "./passportLocal.js";
import jwtStrategy from "./passportJWT.js";

import dotenv from "dotenv";
import googleStrategy from "passport-google-oauth2";
import facebookStrategy from "passport-facebook";
import linkedInStrategy from "passport-linkedin-oauth2";
import twitterStrategy from "passport-twitter";

const GoogleStrategy = googleStrategy.Strategy;
const FacebookStrategy = facebookStrategy.Strategy;
const LinkedInStrategy = linkedInStrategy.Strategy;
const TwitterStrategy = twitterStrategy.Strategy;

dotenv.config();

const InitiatePassport = (passport) => {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(localStrategy);
  passport.use(jwtStrategy);

  //Google strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/google/callback",
        passReqToCallback: true,
      },
      (request, accessToken, refreshToken, profile, done) => {
        console.log(profile);
        done(null, profile);
      }
    )
  );

  // //facebook strategy
  // passport.use(
  //   new FacebookStrategy(
  //     {
  //       // pull in our app id and secret from our auth.js file
  //       clientID: process.env.FACEBOOK_CLIENT_ID,
  //       clientSecret: process.env.FACEBOOK_SECRET_ID,
  //       callbackURL: "http://localhost:3000/facebook/callback",
  //       profileFields: [
  //         "id",
  //         "displayName",
  //         "name",
  //         "gender",
  //         "picture.type(large)",
  //         "email",
  //       ],
  //     }, // facebook will send back the token and profile
  //     function (token, refreshToken, profile, done) {
  //       console.log(profile);
  //       return done(null, profile);
  //     }
  //   )
  // );

  // //LinkedIn strategy
  // passport.use(
  //   new LinkedInStrategy(
  //     {
  //       clientID: process.env.LINKEDIN_CLIENT_ID,
  //       clientSecret: process.env.LINKEDIN_SECRET_ID,
  //       callbackURL: "http://localhost:3000/linkedin/callback",
  //       scope: ["r_emailaddress", "r_liteprofile"],
  //     },
  //     function (token, tokenSecret, profile, done) {
  //       return done(null, profile);
  //     }
  //   )
  // );

  // //Twitter Strategy
  // passport.use(
  //   new TwitterStrategy(
  //     {
  //       clientID: process.env.TWITTER_CLIENT_ID,
  //       clientSecret: process.env.TWITTER_SECRET_ID,
  //       callbackURL: "http://localhost:3000/twitter/callback",
  //     },
  //     function (token, tokenSecret, profile, cb) {
  //       console.log("call");
  //       done(null, profile);
  //     }
  //   )
  // );
};

export default InitiatePassport;
