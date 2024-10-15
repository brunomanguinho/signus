const dao = require("../dao/conn");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");
const mongoose = dao.conn;


const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports.User = User;

module.exports.userSchema = userSchema;