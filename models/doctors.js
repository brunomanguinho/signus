const { mongo } = require("mongoose");
const dao = require("../dao/conn");
const mongoose = dao.conn;

const doctorSchema = new mongoose.Schema({
    name: String,
    document: String,
    //profile or user?
    profile_id:{
        type: mongooese.ObjectId,
        ref: "Profile"
    }
});

module.exports.Doctor = mongoose.model("Doctor", doctorSchema);