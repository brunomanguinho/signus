const {User} = require("../models/users");
const profileDAO = require("./profileDAO");

module.exports.registerUser = 
    async (username, password)=>{
        let user = new User({
            username: username
        })

        await user.setPassword(password);
        await user.save();

        if (user) {
            await profileDAO.createProfile(user);
        }

        return user;
    }

module.exports.authenticate = 
    async(email, password)=>{
        let user = await User.authenticate()(email, password);

        return user;
    }