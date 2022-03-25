const res = require("express/lib/response");
const db = require("../../database.js", { root: "." }); //check path
const express = require("express");
const { use } = require("../routes/inforoute");
const app = express();
app.use(express.json());
const { DateTime } = require("luxon");
let date = DateTime.local();
let bool = 0;
let filteredata;
let delpermission = 0;
let branchname;
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
        console.log(rows.length);
        for (let i = 0; i < rows.length; i++) {
          query += rows[i].enrollment_number;
          if (rows.length > 1 && i < rows.length - 1) {
            query += " or ";
          }
        }

        if (rows.length === 0) {
          db.query(
            `SELECT * from branch where branch_id=${branch}`,
            (err, rows) => {
              if (err) throw err;
              branchname = rows[0].branch_name;
              let newData = { branch: branchname };
              res.render("data", { layout: "information", data: newData });
              console.log("hello");
            }
          );
        } else {
          console.log(query);
          db.query(
            `SELECT * FROM acadinformation where enrollment_number= ${query} order by time_stamp desc `,
            (err, rows) => {
              if (!err) {
                console.log(req.session.userinfo);

                db.query(
                  `SELECT * from branch where branch_id=${branch}`,
                  (err, rows) => {
                    if (err) throw err;
                    branchname = rows[0].branch_name;
                  }
                );

                let rowData = Object.values(JSON.parse(JSON.stringify(rows)));
                let newData = { info: rowData, branch: branchname };
                console.log(newData.info[0]);
                res.render("data", { layout: "information", data: newData });
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

    console.log({ enrollment_number, message, tag });

    db.query(
      `SELECT * FROM STUDENTS WHERE enrollment_number= ${enrollment_number} and role_id=1 and branch_id=${branch} and study_year=${year}`,
      (err, rows) => {
        if (err) throw err;
        if (rows[0] === undefined) {
          res.send("Not Authorised to post");
        } else {
          db.query(
            "INSERT INTO acadinformation (enrollment_number,tag,message) VALUES(" +
              db.escape(enrollment_number) +
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
          db.query(
            `SELECT * from branch where branch_id=${branch}`,
            (err, rows) => {
              if (err) throw err;
              branchname = rows[0].branch_name;
              let newData = { branch: branchname };
              res.render("data", { layout: "information", data: newData });
              console.log("hello");
            }
          );
        } else {
          db.query(
            `SELECT * FROM acadinformation where enrollment_number= ${query} and tag="${tag}" order by time_stamp desc`,
            (err, rows) => {
              if (!err) {
                db.query(
                  `SELECT * from branch where branch_id=${branch}`,
                  (err, rows) => {
                    if (err) throw err;
                    branchname = rows[0].branch_name;
                  }
                );

                bool = 1;
                console.log(req.session.userinfo);
                let rowData = Object.values(JSON.parse(JSON.stringify(rows)));
                filteredata = { info: rowData, branch: branchname };
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
      res.render("data", { layout: "information", data: newData });
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
