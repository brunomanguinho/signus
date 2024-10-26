const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
    res.render("unity", {profile: req.session.profile});
});

module.exports = router;