const express = require("express");
const exphbs = require("express-handlebars");

require("dotenv").config();
const app = express();
const port = 5000;
const session = require("express-session");
const cookie = require("cookie-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.use(cookie());

app.use(
  session({
    name: process.env.SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESS_SECRET,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, //1 day
    },
  })
);

const handlebars = exphbs.create({ extname: ".hbs" });
app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");
const routesacadinfo = require("./server/routes/inforoute");
const rootroute = require("./server/routes/loginroute");
const dashroute = require("./server/routes/dashboardroute.js");
const clubroute = require("./server/routes/clubroute");
app.use("/acad", routesacadinfo);
app.use("/", rootroute);
app.use("/dashboard", dashroute);
app.use("/club", clubroute);
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
