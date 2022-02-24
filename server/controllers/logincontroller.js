const db = require("D:/Attique-IITR/database"); //check path
const express = require("express");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//logincheck hashing
exports.loginsubmit = (req, res) => {
  console.log("Login Attempted");
  console.log(req.body);
  const { reqenrollment_number, reqpassword } = req.body;
  console.log(reqenrollment_number);
  db.query(
    "SELECT * FROM students WHERE enrollment_number=" +
      db.escape(reqenrollment_number),
    (err, rows) => {
      if (!err) {
        if (rows[0] === undefined) {
          res.send("User doesn't exist");
        } else {
          const verified = bcrypt.compareSync(reqpassword, rows[0]["pass"]);
          if (verified) {
            console.log("login succefull");
            req.session.userinfo = rows[0].enrollment_number; //session

            res.redirect("/acad");
          } else {
            res.send("Incorrect Enrollment number or password");
          }
        }
      } else {
        console.log(err);
      }
    }
  );
};

//login students
exports.login = (req, res) => {
  console.log("User Detected");
  if (req.session.userinfo) {
    return res.redirect("/acad");
  } else {
    return res.sendFile("D:/Attique-IITR/views/screens/index.html"); //static file
  }

  //static path
};

//signup
exports.signup = (req, res) => {
  console.log("signup detect");
  res.sendFile("D:/Attique-IITR/views/screens/sign-up.html"); //static path
};
//basic signup entry
exports.signupentry = (req, res) => {
  console.log("sign-up nearabout finished");
  console.log(req.body);
  const {
    enrollment_number,
    first_name,
    second_name,
    email,
    year,
    password,
    password_repeat,
  } = req.body;
  //confirming both password are same
  if (password === password_repeat) {
    //Implementing hashing and storing data
    bcrypt.hash(password, 10, (err, hash) => {
      if (!err) {
        db.query(
          "SELECT * FROM students WHERE enrollment_number=" +
            db.escape(enrollment_number),
          (err, rows) => {
            if (!err) {
              console.log(rows);
              if (rows[0] === undefined) {
                console.log("unique user");
                db.query(
                  "INSERT INTO students (enrollment_number,first_name,second_name,email,study_year,pass) VALUES (" +
                    db.escape(enrollment_number) +
                    "," +
                    db.escape(first_name) +
                    "," +
                    db.escape(second_name) +
                    "," +
                    db.escape(email) +
                    "," +
                    db.escape(year) +
                    "," +
                    db.escape(hash) +
                    ")",
                  (err, row) => {
                    if (!err) {
                      console.log("yo!! welcome to the fam");
                      res.redirect("/");
                    } else {
                      console.log(err);
                    }
                  }
                );
              } else {
                res.send("User Already Exits");
              }
            } else console.log(err);
          }
        );
      } else {
        console.log(err);
      }
    });
  } else {
    res.send("Both passwords not same");
  }
};

//logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/acad");
    }
    res.clearCookie(process.env.SESS_NAME);
    res.redirect("/");
  });
};
