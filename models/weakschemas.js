const dao = require("../dao/conn");
const mongoose = dao.conn;

const patientSchema = new mongoose.Schema({
    name: String,
    mother: String,
    gender:{
        type: String,
        enum: ["male", "female"]
    },
    entrance: Date,
    birth: Date,
    cardNumber: String,
    motive:{
        type: String,
        enum: ["Cirúrgico", "Clínico"]
    },
    alergies: String,
});

const todolistSchema = new mongoose.Schema({
    date: Date,
    description: String,
})

module.exports.patientSchema = patientSchema;
module.exports.todolistSchema = todolistSchema;
