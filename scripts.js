const user = require("./models/users");
const Hospital = require("./models/hospitals");
const Unity = require("./models/unities")

module.exports.createHospital = 
    async (hospital)=>{
        let h = await Hospital.findOne({name: hospital.name});

        if ((!h) || (h == null)){
            h = new Hospital(hospital);
            h.createDate = new Date();
            h.save();
        }

        return h;
    }


module.exports.createUnity = 
    async(hospital_id, name, username, rooms)=>{
        let user = await this.createUser(username, "Plantonista");

        let roomArray = [];

        for (let i=1 ; i<=rooms; i++){
            roomArray.push({number: i});
        }

        let un;

        if (user){
            un = new Unity({
                user_id: user._id,
                hospital: hospital_id,
                name: name,
                rooms: roomArray
            });

            un.save();
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
                let register = await
                    user.register({
                        username: username,
                        password: "abc123456",
                        confirmedPassword: "abc123456",
                        profile: profiletype
                    });

                return register.data;
            } else{
                return u;
            } 
            
        }catch(err){
            console.log("error creating user");
            throw err;
        }
    }
    