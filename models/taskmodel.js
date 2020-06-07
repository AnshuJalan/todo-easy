const mongoose = require('mongoose');
const validator = require('validator');

const taskSchema = new mongoose.Schema({
  description:{
    type:String,
    required:true,
    trim:true,
  },
  status:{
    type:String,
    trim:true,
    lowercase:true,
    default:"inprogress",
    enum:["inprogress","completed"],
  },
  label:{
    type:String,
    default:"others",
    lowercase:true,
    enum:["personal","work","shopping","others"],
    trim:true
  },
  duedate:{
    type:Date,
    default:Date.now
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'User'
  }
});


const Task=mongoose.model('Task',taskSchema);

module.exports= Task;
