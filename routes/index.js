const express = require("express");
const router = express.Router();
const scripts = require("../scripts");

router.get("/", async (req, res)=>{
    console.log("/on index route")

    let h = await scripts.createHospital({
        name: "Hospital da Bahia",
        slogan: "Cuidando de vidas"
    });

    req.session.hospital = h._id;

    scripts.createUnity(req.session.hospital, `Unidade 1`, `unidade1`, 7);
    scripts.createUnity(req.session.hospital, `Unidade 2`, `unidade2`, 5);

    res.redirect("/unidades");

    // if (!req.session.user){
    //     let user = await scripts.createUser("Unidade1", "Plantonista");

    //     req.session.user = user._id;
    //     req.session.profile = user.profile;
    // }
    
    // if (req.session.profile === "Plantonista"){
    //     res.redirect("/unidades");
    // } else {
    //     res.end();
    // }
        
})

module.exports = router;