const express = require("express");
const router = express.Router();
const scripts = require("../scripts");

router.get("/", async (req, res)=>{
    console.log("/on index route")
    await scripts.createHospital({
        name: "Hospital da Bahia",
        slogan: "Cuidando de vidas"
    });

    if (!req.session.user){
        let user = await scripts.createUser("Unidade1", "Plantonista");

        req.session.user = user._id;
        req.session.profile = user.profile;
    }
    
    if (req.session.profile === "Plantonista"){
        res.redirect("/unidades");
    } else {
        res.end();
    }
        
})

module.exports = router;