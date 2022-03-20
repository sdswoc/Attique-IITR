const express = require("express");
const session = require("express-session");
const app = express();
app.use(express.json());

//dashboard view
exports.view = (req, res) => {
  if (req.session.userinfo) {
    console.log("Welcome aboard");
    res.sendFile("D:/Attique-IITR/views/screens/dash.html");
  } //static path
  else {
    res.redirect("/");
  }
};
