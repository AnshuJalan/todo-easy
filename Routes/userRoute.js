const express = require('express');
const router=new express.Router()
const User=require('../models/usermodel.js')
const Task=require('../models/taskmodel.js')
const passport = require('passport');
const auth = require('../auth/auth.js');



//posting a user  or signup ***************************************************
router.post('/signup',async(req,res)=>{
  console.log("entered");
    try {
      const user=await User(req.body)
      await user.save()
      console.log(user);
      res.send(200).json({status: 'ok'});
    } catch (e) {
      res.status(500).send(e)
    }
})
//*****************************************************************************


//login local *****************************************************************
router.post('/login',
  passport.authenticate('local', {failureRedirect: '/login',}),
  (req,res)=>{
    req.token=req.user.token
    res.send(req.user);
  }
);
//*******************************************************************************

//logout page *******************************************************************
router.post('/logout',auth,async (req,res)=>{
   req.user.tokens = req.user.tokens.filter((token)=>{
    return token.token !== req.token
  })
  await req.user.save()
  res.send(req.user)
})
//*******************************************************************************

//logoutall *********************************************************************
router.post('/logoutall',auth,async (req,res)=>{
  req.user.tokens=[]
  await req.user.save()
  res.send(req.user)
})
//*******************************************************************************

router.delete('/user/:id',auth,async (req,res)=>{
  try {
  const user = await User.findByIdAndDelete(req.params.id)
  const tasks = await Task.deleteMany({owner:user._id})
  if(!tasks.ok){
    return res.status(404).send({error:"No task deleted"})
  }
  if(!user){
    return res.status(404).send({Error:"No User with that user_id"})
  }
   res.send({user:user,count:tasks.deletedCount})
} catch (e) {
  res.status(400).send(e)
}
});

module.exports=router;
