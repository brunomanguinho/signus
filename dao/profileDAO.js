const Profile = require("../models/profiles");

module.exports.createProfile = 
    async (user, kind)=>{
        console.log("trying to create a profile")
        try{
            let profile = new Profile({
                user_id: user._id,
                name: user.username.split("@")[0],
                kind: kind
            });
    
            await profile.save();
        } catch(err){
            console.log(err);
            return null;
        }
        
    }