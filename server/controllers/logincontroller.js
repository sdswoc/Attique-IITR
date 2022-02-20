const res = require("express/lib/response");
const db = require("D:/Attique-IITR/database"); //check path
const express = require("express");
const { use } = require("../routes/loginroute.js");
const app = express();
app.use(express.json());

//login
exports.login=(req,res)=>{
    console.log("User Detected")
    res.sendFile("D:/Attique-IITR/index.html") //static path
}
//logincheck without hashing
exports.loginsubmit=(req,res)=>{
    console.log("Login Attempted")
    console.log(req.body)
    const {reqenrollment_number,reqpassword}=req.body
    console.log(reqenrollment_number)
    db.query("SELECT * FROM students WHERE enrollment_number="+db.escape(reqenrollment_number)+"and "+"pass="+db.escape(reqpassword),(err,rows)=>{
        if(!err){
            if(rows[0]===undefined){
                res.send("Enrollment Number or Password didn't match")
            }
            else{
                res.redirect('/acad')
            }
        }
        else{
            console.log(err)
        }
    })
}

//signup
exports.signup=(req,res)=>{
    console.log("signup detect")
    res.sendFile("D:/Attique-IITR/sign-up.html") //static path
}
//basic signup entry
exports.signupentry=(req,res)=>{
    console.log("sign-up nearabout finished")
    console.log(req.body)
    const {enrollment_number,first_name,second_name,email,year,password}=req.body
    db.query("INSERT INTO students (enrollment_number,first_name,second_name,email,study_year,pass) VALUES ("+db.escape(enrollment_number)+","+db.escape(first_name)+","+db.escape(second_name)+","+db.escape(email)+","+db.escape(year)+","+db.escape(password)+")",(err,row)=>{
        if(!err){
            console.log("yo!! welcome to the fam")
            res.redirect("/")
        }
        else{
            console.log(err)
        }
    })
}