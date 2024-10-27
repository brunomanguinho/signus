const dao = require("../dao/conn");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");
const mongoose = dao.conn;
const userDAO = require("../dao/userDAO");


const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    profile: {
        type: String,
        enum: ["Admiministrador", "Coordenador", "Diarista", "Plantonista"]
    },
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports.register = 
    async (data)=>{
        try{
            let username = data.username;
            let password = data.password;
            let confirmedPassword = data.confirmedPassword;
        
            if (
                ( (!username) || (!password) || (!confirmedPassword) ) ||
                ( (username === "") && (password === "") && (confirmedPassword === "") )
               )
            {
                return {success: false, message: "One or more arguments is missing"};
            } else if (password !== confirmedPassword) {
                return {success: false, message: "Passwords are divergents"};
            } else {
                let user = await userDAO.registerUser(username, password, data.profile);
    
                if (user !== null){
                    return ({success: true, message: "User registered successfully", data: user});
                } else {
                    return ({success: false, message: "Error while creating user", data: user})
                }
            }
        } catch(err){
            if (err.code === 11000) {
                return ({success: false, message: `The user ${err.keyValue.username} is already registered`, data: err})
            } else {
                return ({success: false, message: "Unknow error while creating user", data: err})
            }
        }
    }

module.exports.login = 
    async(data)=>{
        let user = await userDAO.authenticate(data.username, data.password);

        return user;
    }

module.exports.User = User;

module.exports.userSchema = userSchema;