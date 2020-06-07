const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/usermodel.js')
const bcryptjs = require('bcryptjs');
//const keys = require('../keys.js');

//serialize ********************************************************************
passport.serializeUser(function(user, done) {
  done(null, user);
});
//******************************************************************************

//deserialize ******************************************************************
passport.deserializeUser(function(user, done) {
  done(null, user);
});
//******************************************************************************


//Local Strategy ********************************************************************************
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session:false
},
  async(username, password, done)=> {
    try{
      var user= await User.findOne({email:username})
      if(!user){
          done(null,{error:"Invalid email or password"})
        }
      const isMatch=await bcryptjs.compare(password,user.password);
      if(!isMatch){
        done(null,{error:"Invalid email or password"});
      }
      const token = await user.generateAuthToken()
      console.log(user,token);done(null,{user:user,token:token});
    }catch(e){
      console.log(e);
      done(null,{error:e})
    }
  //done(null,{});
  }
));
//*************************************************************************************************
