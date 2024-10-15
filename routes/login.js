const express = require("express");
const router = express.Router();
const userDAO = require("../dao/userDAO");

router.get("/", async(req, res)=>{
    // let username = req.body.username;
    // let password = req.body.password;
    let username = 'brunomanguinho';
    let password = 'killers';

    try{
        let user = await userDAO.authenticate(username, password);

        if (user.user){
            //res.json({success: true, message: "User authenticated successfully", data: user});
            console.log(user);
            res.render("index", {data: user})
        } else {
            res.json({success: false, message: "Unable to authenticate user"});
        }
        
    } catch(err){
        console.log(err);
        res.json({success: false, message: "error while authenticating user", data: err});
    }
});

module.exports = router;