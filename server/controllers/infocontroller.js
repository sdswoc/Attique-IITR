const res = require("express/lib/response");
const db = require("D:/Attique-IITR/database"); //check path
const express = require("express");
const { use } = require("../routes/inforoute");
const app = express();
app.use(express.json());
const { DateTime } = require("luxon");
let date = DateTime.local();

//view data
exports.view = (req, res) => {
  if (req.session.userinfo) {
    console.log("welcome to the first connection");
    const { branch, year } = req.cookies;

    db.query(
      `SELECT enrollment_number from students where branch_id=${branch} and role_id=1 and study_year=${year}`,
      (err, rows) => {
        if (err) throw err;
        let query = "";
        for (let i = 0; i < rows.length; i++) {
          query += rows[i].enrollment_number;
          if (rows.length > 1 && i < rows.length) {
            query += " or";
          }
        }
        db.query(
          `SELECT * FROM acadinformation where enrollment_number= ${query} `,
          (err, rows) => {
            if (!err) {
              console.log("wtf");
              res.render("data", { layout: "information", data: rows });
            } else {
              console.log(err);
            }
          }
        );
      }
    );
  } else {
    res.redirect("/");
  }
};

//filling data
exports.addacad = (req, res) => {
  if (req.session.userinfo) {
    console.log("adding post");
    console.log(req.body);
    const { enrollment_number, message, time_stamp, tag } = req.body;

    console.log({ enrollment_number, time_stamp, message, tag });
    db.query(
      "INSERT INTO acadinformation (enrollment_number,time_stamp,tag,message) VALUES(" +
        db.escape(enrollment_number) +
        "," +
        db.escape(time_stamp) +
        "," +
        db.escape(tag) +
        "," +
        db.escape(message) +
        ")",
      (err, rows) => {
        if (!err) {
          res.redirect("/acad");
        } else {
          console.log(err);
        }
      }
    );
  } else {
    res.redirect("/");
  }
};

//filter the data
exports.filteracad = (req, res) => {
  if (req.session.userinfo) {
    console.log(req.body);
    const tag = req.body.tag;
    db.query(
      "SELECT * FROM acadinformation WHERE tag=" + db.escape(tag),
      (err, rows) => {
        if (!err) {
          res.render("data", { layout: "information", data: rows });
        } else {
          console.log(err);
        }
      }
    );
  } else {
    res.redirect("/");
  }
};

//delete data
exports.deleteacad = (req, res) => {
  if (req.session.userinfo) {
    const { msgID } = req.body;
    console.log("User requested to delete data");
    db.query(
      `DELETE FROM acadinformation WHERE msgID=${db.escape(msgID)}`,
      (err, rows) => {
        if (!err) {
          return res.redirect("/acad");
        } else {
          console.log(err);
        }
      }
    );
  } else {
    res.redirect("/");
  }
};
