import express from "express";
import errorParser from "../Utils/Validator/error.parser.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/index");
});
router.get("/failed", (req, res) => res.send("You Failed to log in!"));

router.get("/good", (req, res) => {
  console.log(req.user.photos[0].value);
  res.render("pages/profile.ejs", {
    name: req.user.displayName,
    pic: req.user._json.picture,
    email: req.user.emails[0].value,
    profile: "google",
  });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  (req, res) => {
    res.redirect("/good");
  }
);

router.get("/profile", (req, res) => {
  res.render("pages/profile", {
    profile: "facebook",
    name: req.user.displayName,
    pic: req.user.photos[0].value,
    email: req.user.emails[0].value, // get the user out of session and pass to template
  });
});

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: "email" })
);

router.get(
  "/auth/linkedin",
  passport.authenticate("linkedin", {
    scope: ["r_emailaddress", "r_liteprofile"],
  })
);

router.get(
  "/auth/twitter",
  passport.authenticate("twitter", {
    scope: "email",
  })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/",
  })
);

router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", {
    successRedirect: "/profile",
    failureRedirect: "/",
  })
);

router.get(
  "/twitter/callback",
  passport.authenticate("linkedin", {
    successRedirect: "/profile",
    failureRedirect: "/",
  })
);
