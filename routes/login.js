const express = require("express");
const router = express.Router();
const userDAO = require("../dao/userDAO");

router.get("/", async(req, res)=>{
    res.render("login");
});

module.exports = router;