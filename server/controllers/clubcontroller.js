const res = require("express/lib/response");
const db = require("../../database.js", { root: "." }); //check path
const express = require("express");
const { use } = require("../routes/inforoute");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const bcrypt = require("bcrypt");
let bool = 0;
let filteredata;

//view data  done hai
exports.clubview = (req, res) => {
  if (req.session.clubinfo || req.session.userinfo) {
    console.log("welcome to the first club connection");

    db.query(
      "SELECT * FROM clubinformation order by time_stamp desc",
      (err, rows) => {
        if (!err) {
          res.render("clubdata", { layout: "clubinformation", data: rows });
        } else {
          console.log(err);
        }
      }
    );
  } else {
    res.redirect("/");
  }
};

//filling data  done
exports.addclub = (req, res) => {
  if (req.session.clubinfo) {
    console.log("adding club post");
    console.log(req.body);
    email = req.session.clubinfo;
    const { message, tag } = req.body;

    console.log({ email, message, tag });
    db.query(
      "INSERT INTO clubinformation (email,tag,message) VALUES(" +
        db.escape(email) +
        "," +
        db.escape(tag) +
        "," +
        db.escape(message) +
        ")",
      (err, rows) => {
        if (!err) {
          res.redirect("/club");
        } else {
          console.log(err);
        }
      }
    );
  } else {
    res.redirect("/club");
  }
};

//filter the data tmrw
exports.filterclub = (req, res) => {
  if (req.session.clubinfo || req.session.userinfo) {
    console.log(req.body);
    const { tag, club } = req.body;

    db.query(`SELECT * FROM club WHERE club_name="${club}"`, (err, rows) => {
      if (err) throw err;
      db.query(
        `SELECT * FROM clubinformation WHERE tag="${tag}" and email="${rows[0].email}" order by time_stamp desc`,
        (err, rows) => {
          if (!err) {
            filteredata = rows;
            bool = 1;
            console.log(rows);
            res.render("clubdata", { layout: "clubinformation", data: rows });
          } else {
            console.log(err);
          }
        }
      );
    });
  } else {
    res.redirect("/");
  }
};

//render filtered data

exports.clubfilterender = (req, res) => {
  if (req.session.userinfo || req.session.clubinfo) {
    if (bool) {
      console.log("hello");
      res.render("clubdata", { layout: "clubinformation", data: filteredata });
      bool = 0;
    }
  } else {
    res.redirect("/");
  }
};

//delete
exports.deleteclub = (req, res) => {
  if (req.session.clubinfo) {
    const { msgID } = req.body;
    console.log(msgID);
    console.log("User requested to delete data");

    db.query(
      `SELECT * FROM clubinformation WHERE msgID=${db.escape(msgID)}`,
      (err, rows) => {
        if (err) throw err;
        else {
          if (req.session.clubinfo === rows[0].email) {
            db.query(
              `DELETE FROM clubinformation WHERE msgID=${db.escape(msgID)}`,
              (err, rows) => {
                if (!err) {
                  return res.redirect("/club");
                } else {
                  console.log(err);
                }
              }
            );
          }
        }
      }
    );
  } else {
    res.redirect("/club");
  }
};

//logincheck hashing  done
exports.loginsubmit = (req, res) => {
  console.log("Club Login Attempted");
  console.log(req.body);
  const { reqemail, reqpassword } = req.body;
  console.log(reqemail);
  db.query(
    "SELECT * FROM club WHERE email=" + db.escape(reqemail),
    (err, rows) => {
      if (!err) {
        if (rows[0] === undefined) {
          res.send("Club doesn't exist");
        } else {
          const verified = bcrypt.compareSync(
            reqpassword,
            rows[0]["master_key"]
          );
          if (verified) {
            console.log("login succefull");
            req.session.clubinfo = rows[0].email; //session

            res.redirect("/club");
          } else {
            res.send("Incorrect Club Email or password");
          }
        }
      } else {
        console.log(err);
      }
    }
  );
};

//login club
exports.clublogin = (req, res) => {
  console.log("ClubUser Detected");
  if (req.session.clubinfo) {
    return res.redirect("/club");
  } else {
    return res.sendFile("/views/screens/clubsign.html", { root: "." });
  }
};

//logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/club");
    }
    res.clearCookie(process.env.SESS_NAME);
    res.redirect("/club/login");
  });
};

//clubsignup, private api
exports.signupentry = (req, res) => {
  console.log("sign-up nearabout finished");
  console.log(req.body);
  const { club_name, master_key, email, council } = req.body;

  //Implementing hashing and storing data ....done
  bcrypt.hash(master_key, 10, (err, hash) => {
    if (!err) {
      db.query(
        "INSERT INTO club (club_name,email,master_key,council) VALUES (" +
          db.escape(club_name) +
          "," +
          db.escape(email) +
          "," +
          db.escape(hash) +
          "," +
          db.escape(council) +
          ")",
        (err, row) => {
          if (!err) {
            console.log("yo!! welcome to the club fam");
            res.redirect("/club/login");
          } else {
            console.log(err);
          }
        }
      );
    } else {
      console.log(err);
    }
  });
};
