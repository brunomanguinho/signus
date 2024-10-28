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

    scripts.createUnity(h._id, `Unidade 1`, `unidade1`, 7);
    scripts.createUnity(h._id, `Unidade 2`, `unidade2`, 5);
    scripts.createUnity(h._id, `Unidade 3`, `unidade3`, 10);

    res.redirect("/unidades");
});

router.get("/logoff", (req, res)=>{
    req.logout;
    req.session.userId = null,
    req.session.profile = null;

    res.redirect("/login");
})

module.exports = router;