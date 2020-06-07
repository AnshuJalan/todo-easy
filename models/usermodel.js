const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
//const KEYS=require('../keys.js')

//USER SCHEMA **********************************************************************************
const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    trim:true,
  },
  email:{
    type:String,
    required:true,
    trim:true,
    unique:true,
    lowercase:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error('Not a valid email !');
    }
  }
},

  password:{
    type:String,
    required:true,
    trim:true,
    minlength:7,
    validate(value){
      if(validator.contains(value.toLowerCase(),'password')){
        throw new Error('Password cannot contain "password" ')
      }
    }
  },
  tokens:[{
    token:{
      type:String,
      required:false
    }
  }],
  // avatar:{
  //   type: Buffer
  // }
});
//*******************************************************************************************
//Relation between task and user*************************************************************
userSchema.virtual('task',{
  ref:'Task',
  localField:'_id',
  foreignField:'owner'
})

//***********************************************************************************
userSchema.statics.findByCredentials=async (email,password)=>{
  const user=await User.findOne({email:email})
  if(!user){
    throw new Error("User not found!!")
  }
  const isMatch=await bcryptjs.compare(password,user.password)
  if(!isMatch){
    throw new Error("User not found!!")
  }
  return user;
}
//************************************************************************************



// generateAuthToken*********************************************************************

userSchema.methods.generateAuthToken = async function () {
  const user =this
  const token = jwt.sign({_id:user._id.toString()},process.env.jwtkey)
  user.tokens = user.tokens.concat({token})
  await user.save();
  return token;
}

//**************************************************************************************

userSchema.methods.toJSON = function(){
  const user = this
  const userObject = user.toObject()
  delete userObject.password
  delete userObject.tokens
  delete userObject.avatar
  return userObject;
}

//**********************************************************************
userSchema.pre('save',async function(next){
  const user= this
  if(user.isModified('password')){
    user.password=await bcryptjs.hash(user.password,8)
  }
  next()
})
//***********************************************************************

const User= mongoose.model('User',userSchema);




module.exports=User;
