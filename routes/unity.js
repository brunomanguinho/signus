const express = require("express");
const router = express.Router();
const Unity = require("../models/unities");

router.get("/", async (req, res)=>{
    try{
        let unity = await Unity.findOne({
            user_id: req.session.user
        });

        console.log(unity);

        if (unity !== null){
            res.render("unity", {data: unity});
        } else {
            res.send("não há unidades para esse usuário")
        }
    }catch(err){
        console.log("erro ao de pesquisa", err)
    }
    
});

module.exports = router;