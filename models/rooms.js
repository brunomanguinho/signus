const dao = require("../dao/conn");
const mongoose = dao.conn;

const roomSchema = new mongoose.Schema({
    number: Number
})