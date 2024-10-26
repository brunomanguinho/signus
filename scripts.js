const user = require("./models/users");
const Profile = require("./models/profiles")
const Hospital = require("./models/hospital");
const { model } = require("mongoose");


module.exports.createHospital = 
    async (hospital)=>{
        let h = await Hospital.findOne({name: hospital.name});

        if ((!h) || (h == null)){
            h = new Hospital(hospital);
            h.createDate = new Date();
            h.save();
        }
    }

module.exports.createUser = 
    async (username, profiletype)=>{
        
        try{
            let u = await user.User.findOne({
                username: username,
                profile: profiletype
            }).exec();

            console.log("user return", u);

            if ( (!u) || (u == null) ){
                console.log("user not found");
                let register = await
                    user.register({
                        username: username,
                        password: "abc123456",
                        confirmedPassword: "abc123456",
                        profile: profiletype
                    });

                console.log("register data", register);
                return register.data;
            } else{
                return u;
            } 
            
        }catch(err){
            console.log("error creating user");
            throw err;
        }
    }
    