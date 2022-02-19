const res = require("express/lib/response");
const db = require("/Users/Darshan Kumar/Desktop/Attique/database.js");
const express = require("express");
const { use } = require("../routes/inforoute");
const app = express();
app.use(express.json());
exports.view = (req, res) => {
  console.log("welcome to the first connection");

  db.query("SELECT * FROM acadinformation", (err, rows) => {
    if (!err) {
      res.render("data", { layout: "information", data: rows });
    } else {
      console.log(err);
    }
    console.log(rows);
  });
};

exports.add = (req, res) => {
  console.log("adding post");
  //filling data
  console.log(req.body);
  const { enrollment_number, time_stamp, message, tag } = req.body;

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
        res.redirect("/");
      } else {
        console.log(err);
      }
    }
  );
};
