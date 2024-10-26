const u = require("../models/users");
const profileDAO = require("./profileDAO");

module.exports.registerUser = 
    async (username, password, profile)=>{
        console.log("trying to create user...");
        let user = new u.User({
            username: username,
            profile: profile
        })

        await user.setPassword(password);
        await user.save();

        await this.authenticate(username, password)

        return user;
    }

module.exports.authenticate = 
    async(username, password)=>{
        let user = await u.User.authenticate()(username, password);

        return user;
    }