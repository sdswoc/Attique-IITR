const res = require("express/lib/response");
const db = require("D:/Attique-IITR/database"); //check path
const express = require("express");
const { use } = require("../routes/inforoute");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const bcrypt = require("bcrypt");

//view data
exports.clubview = (req, res) => {
  if (req.session.userinfo) {
    console.log("welcome to the first club connection");

    db.query("SELECT * FROM clubinformation", (err, rows) => {
      if (!err) {
        res.render("data", { layout: "information", data: rows }); //change it for club
      } else {
        console.log(err);
      }
      console.log(rows);
    });
  } else {
    res.redirect("/");
  }
};

//filling data
exports.addclub = (req, res) => {
  if (req.session.userinfo) {
    console.log("adding club post");
    console.log(req.body);
    const { club_id, message, time_stamp, tag } = req.body;

    console.log({ club_id, time_stamp, message, tag });
    db.query(
      "INSERT INTO clubinformation (club_id,time_stamp,tag,message) VALUES(" +
        db.escape(club_id) +
        "," +
        db.escape(time_stamp) +
        "," +
        db.escape(tag) +
        "," +
        db.escape(message) +
        ")",
      (err, rows) => {
        if (!err) {
          res.redirect("/acad"); //change it to club
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
exports.filterclub = (req, res) => {
  if (req.session.userinfo) {
    console.log(req.body);
    const tag = req.body.tag;
    db.query(
      "SELECT * FROM clubinformation WHERE tag=" + db.escape(tag),
      (err, rows) => {
        if (!err) {
          res.render("data", { layout: "information", data: rows }); //change it for club
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
exports.deleteclub = (req, res) => {
  if (req.session.userinfo) {
    const { msgID } = req.body;
    console.log("User requested to delete data");
    db.query(
      `DELETE FROM acadinformation WHERE msgID=${db.escape(msgID)}`,
      (err, rows) => {
        if (!err) {
          return res.redirect("/acad"); //change it for club
        } else {
          console.log(err);
        }
      }
    );
  } else {
    res.redirect("/");
  }
};

//logincheck hashing
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
          const verified = bcrypt.compareSync(reqpassword, rows[0]["pass"]);
          if (verified) {
            console.log("login succefull");
            req.session.clubinfo = rows[0].club_id; //session

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
    return res.sendFile("D:/Attique-IITR/views/screens/index.html"); //static file, have to change for club
  }

  //static path
};

//logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/club");
    }
    res.clearCookie(process.env.SESS_NAME);
    res.redirect("/");
  });
};
