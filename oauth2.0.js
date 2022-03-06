const passport = require("passport");
const OAuth2Strategy = require("passport-oauth2");
const express = require("express");
const router = express.Router();
const XMLHttpRequest = require("xhr2");
const Http = new XMLHttpRequest();
const db = require("D:/Attique-IITR/database"); //check path
require("dotenv").config();
router.get("/", (req, res) => {
  return res.sendFile("D:/Attique-IITR/test.html");
});

router.get("/channeli", passport.authenticate("oauth2"));

router.get(
  "/callback",
  passport.authenticate("oauth2", { failureRedirect: "/", session: false }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log("success")
    res.redirect("/acad");
  }
);

passport.use(
  new OAuth2Strategy(
    {
      authorizationURL: "https://channeli.in/oauth/authorise",
      tokenURL: "https://channeli.in/open_auth/token/",
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:5000/oauth/callback",
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(accessToken);
      console.log("oauth attempted");
      const url = `https://channeli.in/open_auth/get_user_data/`;
      Http.open("GET", url);
      Http.setRequestHeader("Authorization", `Bearer ${accessToken}`);
      Http.send();
      Http.onreadystatechange = function () {
        if (Http.readyState === XMLHttpRequest.DONE && Http.status === 200) {
          console.log(Http.responseText);
          const data = JSON.parse(Http.responseText);
          const reqenrollment_number = data.student.enrolmentNumber;
          console.log(reqenrollment_number);
          db.query(
            "SELECT * FROM students WHERE enrollment_number=" +
              db.escape(reqenrollment_number),
            (err, rows) => {
              if (!err) {
                if (rows[0] === undefined) {
                  //kuch daalunga abhi
                } else {
                  console.log("hurray");
                  return cb();
                }
              }
            }
          );
        }
      };
    }
  )
);

(module.exports = router), passport;
