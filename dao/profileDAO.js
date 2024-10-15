const Profile = require("../models/profiles");

module.exports.createProfile = 
    async (user)=>{
        try{
            let profile = new Profile({
                user_id: user._id,
                name: user.username.split("@")[0]
            });
    
            await profile.save();
        } catch(err){
            console.log(err);
            return null;
        }
        
    }