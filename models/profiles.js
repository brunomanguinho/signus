const dao = require("../dao/conn");
const mongoose = dao.conn;

const profileSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.ObjectId,
        ref: "user"
    },
    name: String,
    kind: {
        type: String,
        enum: ["Admiministrador", "Coordenador", "Diarista", "Plantonista"]
    },
    gender:{
        type: String,
        enum: ["Male", "Female", "None"]
    },
});

const Profile = new mongoose.model("Profile", profileSchema);

module.exports = Profile;