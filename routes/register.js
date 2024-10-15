const express = require("express");
const router = express.Router();
const userDAO = require("../dao/userDAO");

router.post("/", async (req, res)=>{
    try{
        console.log("api calling...", req.body);

        let username = req.body.username;
        let password = req.body.password;
        let confirmedPassword = req.body.confirmedPassword;
    
        if (
            ( (!username) || (!password) || (!confirmedPassword) ) ||
            ( (username === "") && (password === "") && (confirmedPassword === "") )
           )
        {
            res.json({success: false, message: "One or more arguments is missing"});
        } else if (password !== confirmedPassword) {
            res.json({success: false, message: "Passwords are divergents"})
        } else {
            let user = await userDAO.registerUser(username, password, confirmedPassword);

            if (user !== null){
                res.json({success: true, message: "User registered successfully", data: user});
            } else {
                res.json({success: false, message: "Error while creating user", data: user})
            }
        }
    } catch(err){
        if (err.code === 11000) {
            res.json({success: false, message: `The user ${err.keyValue.username} is already registered`, data: err})
        } else {
            res.json({success: false, message: "Unknow error while creating user", data: err})
        }
    }
    
})

module.exports = router;