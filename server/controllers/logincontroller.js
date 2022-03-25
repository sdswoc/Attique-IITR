const db = require("../../database.js", { root: "." }); //check path
const express = require("express");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let eno = 123;

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
            eno = reqenrollment_number;
            req.session.userinfo = rows[0].enrollment_number; //session

            res.redirect("/dashboard");
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
    return res.redirect("/dashboard");
  } else {
    return res.sendFile("/views/screens/index.html", { root: "." });
  }
};

//signup
exports.signup = (req, res) => {
  console.log("signup detect");
  res.sendFile("/views/screens/sign-up.html", { root: "." });
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
    branch,
  } = req.body;
  console.log(branch);
  //confirming both password are same
  if (password === password_repeat) {
    //Implementing hashing and storing data
    bcrypt.hash(password, 10, (err, hash) => {
      if (!err) {
        db.query(
          `SELECT * FROM branch WHERE branch_name = "${branch}"`,
          (err, rows) => {
            if (!err) {
              const branch_id = rows[0].branch_id;
              db.query(
                "SELECT * FROM students WHERE enrollment_number=" +
                  db.escape(enrollment_number),
                (err, rows) => {
                  if (!err) {
                    console.log(rows);
                    if (rows[0] === undefined) {
                      console.log("unique user");
                      db.query(
                        "INSERT INTO students (enrollment_number,first_name,second_name,email,study_year,pass,branch_id,role_id) VALUES (" +
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
                          "," +
                          db.escape(branch_id) +
                          ", 3" +
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
                      db.query(
                        "SELECT * FROM students WHERE enrollment_number=" +
                          db.escape(enrollment_number) +
                          "AND pass=0",
                        (err, rows) => {
                          if (err) throw err;
                          if (rows[0] === undefined) {
                            res.send("USER ALREADY EXISTS");
                          } else {
                            db.query(
                              "DELETE FROM students WHERE enrollment_number=" +
                                db.escape(enrollment_number) +
                                "AND pass=0",
                              (err, rows) => {
                                if (err) throw err;
                                db.query(
                                  "INSERT INTO students (enrollment_number,first_name,second_name,email,study_year,pass,branch_id,role_id) VALUES (" +
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
                                    "," +
                                    db.escape(branch_id) +
                                    ", 1" +
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
                              }
                            );
                          }
                        }
                      );
                    }
                  } else console.log(err);
                }
              );
            } else {
              console.log(err);
            }
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
