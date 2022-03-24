const res = require("express/lib/response");
const db = require("D:/Attique-IITR/database"); //check path
const express = require("express");
const { use } = require("../routes/inforoute");
const app = express();
app.use(express.json());
const { DateTime } = require("luxon");
let date = DateTime.local();
let bool = 0;
let filteredata;
let delpermission = 0;
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

        if (rows.length === 0) {
          res.render("data", { layout: "information" });
        } else {
          db.query(
            `SELECT * FROM acadinformation where enrollment_number= ${query} `,
            (err, rows) => {
              if (!err) {
                console.log(req.session.userinfo);
                res.render("data", { layout: "information", data: rows });
              } else {
                console.log(err);
              }
            }
          );
        }
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
    const { message, tag } = req.body;
    enrollment_number = req.session.userinfo;
    const { branch, year } = req.cookies;
    time_stamp = "19-03-2022 22:15";

    console.log({ enrollment_number, time_stamp, message, tag });

    db.query(
      `SELECT * FROM STUDENTS WHERE enrollment_number= ${enrollment_number} and role_id=1 and branch_id=${branch} and study_year=${year}`,
      (err, rows) => {
        if (err) throw err;
        if (rows[0] === undefined) {
          res.send("Not Authorised to post");
        } else {
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

        if (rows.length === 0) {
          res.render("data", { layout: "information" });
        } else {
          db.query(
            `SELECT * FROM acadinformation where enrollment_number= ${query} and tag="${tag}" `,
            (err, rows) => {
              if (!err) {
                bool = 1;
                console.log(req.session.userinfo);
                filteredata = rows;
                console.log(filteredata);
                res.send(rows);
              } else {
                console.log(err);
              }
            }
          );
        }
      }
    );
  } else {
    res.redirect("/");
  }
};

//rendering filtered data
exports.filterender = (req, res) => {
  if (req.session.userinfo) {
    if (bool) {
      console.log("hello");
      res.render("data", { layout: "information", data: filteredata });
      bool = 0;
    }
  } else {
    res.redirect("/");
  }
};

//delete data
exports.deleteacad = (req, res) => {
  const { msgID } = req.body;
  console.log("delete request accepted");
  if (req.session.userinfo && delpermission === 1) {
    db.query(
      `DELETE FROM acadinformation WHERE msgID=${db.escape(msgID)}`,
      (err, rows) => {
        delpermission = 0;
        if (!err) {
          return res.redirect("/acad");
        } else {
          console.log(err);
        }
      }
    );
  } else {
    res.redirect("/acad");
  }
};

//delpermission
exports.deleteacadpermission = (req, res) => {
  if (req.session.userinfo) {
    const { msgID } = req.body;
    console.log("User requested to delete data");
    db.query(
      `SELECT * FROM acadinformation WHERE msgID=${db.escape(msgID)}`,
      (err, rows) => {
        if (req.session.userinfo === rows[0].enrollment_number) {
          delpermission = 1;
          res.json({ success: "true" });
        } else {
          res.json({ success: "false" });
        }
      }
    );
  }
};
