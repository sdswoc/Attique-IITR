const express = require("express");
const app = express();
app.use(express.json());

//dashboard view
exports.view=(req,res)=>{
    console.log("Welcome aboard")
    res.redirect("/")
}

