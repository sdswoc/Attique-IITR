const passport = require("passport");
const OAuth2Strategy = require("passport-oauth2");
const express = require("express");
const router = express.Router();
const XMLHttpRequest = require("xhr2");
const Http = new XMLHttpRequest();
const db = require("D:/Attique-IITR/database"); //check path
require("dotenv").config();
let eno;

router.get("/channeli", passport.authenticate("oauth2"));

router.get(
  "/callback",
  passport.authenticate("oauth2", { failureRedirect: "/", session: false }),
  function (req, res) {
    // Successful authentication, redirect home.
    req.session.userinfo = eno;
    console.log("success");
    res.redirect("/dashboard");
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
          console.log(data);
          const reqenrollment_number = data.student.enrolmentNumber;

          console.log(reqenrollment_number);
          db.query(
            "SELECT * FROM students WHERE enrollment_number=" +
              db.escape(reqenrollment_number),
            (err, rows) => {
              if (!err) {
                if (rows[0] === undefined) {
                  signupauth(data);
                  return cb(null, Http.responseText);
                } else {
                  console.log(rows[0]);
                  eno = rows[0].enrollment_number; //session
                  return cb(null, Http.responseText);
                }
              }
            }
          );
        }
      };
    }
  )
);

function signupauth(data) {
  const enrollment_number = data.student.enrolmentNumber;
  const email = data.contactInformation.instituteWebmailAddress;
  const year = data.student.currentYear;
  const first_name = data.person["fullName"];
  const demobranch = data.student["branch name"];
  let arr = demobranch.split("(");
  let brancharr = arr[1].split(")");
  const branch = brancharr[0];

  db.query(
    `SELECT * FROM branch WHERE branch_name = "${branch}"`,
    (err, rows) => {
      if (!err) {
        const branch_id = rows[0].branch_id;
        db.query(
          "INSERT INTO students (enrollment_number,first_name,email,study_year,branch_id,role_id,pass) VALUES (" +
            db.escape(enrollment_number) +
            "," +
            db.escape(first_name) +
            "," +
            db.escape(email) +
            "," +
            db.escape(year) +
            "," +
            db.escape(branch_id) +
            ", 1,0" +
            ")",
          (err, row) => {
            if (!err) {
              console.log("yo!! welcome to the fam");
            } else {
              console.log(err);
            }
          }
        );
      }
    }
  );
}

module.exports = router;
