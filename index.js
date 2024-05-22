const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended:true
}));

mongoose.connect("mongodb://localhost:27017/signupDatabase");

const userShcema = mongoose.Schema({
    fname:{
        type:String,
        required:true,
    },
    lname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
})

const User = mongoose.model("User" , userShcema);

app.get("/",(req,res)=>{
    return res.render("index.html");
});

app.post("/" , (req,res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;

    const userData = {
        "fname":fname,
        "lname":lname,
        "email":email,
        "password":password,
    }
    const user = User.create(userData);
    res.redirect("success.html");
});

app.listen(3000 , () => {
    console.log("Server is running on port 3000")
});