const mongoose = require('mongoose');

const Task = new mongoose.Schema({
    name:String,
    createdAt:{type:Date, default:Date.now},
    finishedAt:{type:Date},
    start:String,
    end:String,
    status:{type:String, enum:['todo', 'inprogress', 'completed']}
});

module.exports = mongoose.model("Task", Task);