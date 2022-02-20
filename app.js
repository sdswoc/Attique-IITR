const express = require("express");
const exphbs = require("express-handlebars");
const bodyparser = require("body-parser");
const mysql = require("mysql");

require("dotenv").config();
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const handlebars = exphbs.create({ extname: ".hbs" });
app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");
const routesacadinfo = require("./server/routes/inforoute");
const rootroute = require("./server/routes/loginroute");
app.use("/acad", routesacadinfo);
app.use("/", rootroute);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
