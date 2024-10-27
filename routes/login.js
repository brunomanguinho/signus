const express = require("express");
const router = express.Router();
const userDAO = require("../dao/userDAO");

router.get("/", (req, res)=>{
    res.render("login");
});

router.post("/", async (req, res)=>{
    try{
        let user = await userDAO.authenticate(req.body.username, req.body.password);

        if (user){
            req.session.user = user._id,
            req.session.profile = user.profile;

            if (user.profile === "Plantonista"){
                res.redirect("/unidades")
            }
            else{
                res.send("perfil invalido");
            }
        }
    }catch(err){
        console.log("Erro de login", err);
    }
});



module.exports = router;