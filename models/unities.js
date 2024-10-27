const dao = require("../dao/conn");
const mongoose = dao.conn;
const schemas = require("./weakschemas");


const evaluationSchema = new mongoose.Schema({
    updates:[{
        doctor_id:{
            type: mongoose.ObjectId,
            ref: "Doctor"
        },
        date: Date
    }],
    patient: schemas.patientSchema, //necessidade de um model de pacientes?
    issues: String,
    todolist: schemas.todolistSchema,
    dischargePending:{
        neuro: {type: Boolean, default: false},
        hemo: {type: Boolean, default: false},
        breath: {type: Boolean, default: false},
        nephro: {type: Boolean, default: false},
        lifecare: {type: Boolean, default: false},
    }
})

const unitySchema = new mongoose.Schema({
    user_id:{
        type: mongoose.ObjectId,
        ref: "User"
    },
    hospital_id:{
        type: mongoose.ObjectId,
        ref: "Hospital"
    },
    name: String,
    rooms:[
        {
            number: Number,
            evaluations:[//array de avaliações, ou atualizações
                {
                    evaluation: evaluationSchema,
                }
            ]
        }
    ]
});

const Unity = new mongoose.model("Unity", unitySchema);

module.exports = Unity;