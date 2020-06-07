const express = require('express');
const router=new express.Router()
const Task=require('../models/taskmodel.js')
const auth = require('../auth/auth.js');


//getting all tasks *************************************************************
router.get('/task',auth,async(req,res)=>{
    console.log(req.user);
    try{
      const tasks= await Task.find({owner:req.user._id}) //replace with req.user._id
      console.log(tasks);
      if(!tasks || tasks.length==0){
        return res.status(404).send({message:"No task to be displayed"})
      }
      res.status(200).send(tasks)
    }catch(e){
      res.status(500).send(e)
    }

})
//********************************************************************************

//Get logged in user details*******************************

router.get('/user', auth, async(req, res) => {
  if(!req.user)
    res.status(404);
  else
    res.send(req.user);
})

//********************************************************


//adding new task to DB **********************************************************
router.post('/task', auth, async(req,res)=>{ //add auth as middleware
  console.log(req.body);
  try{
      //Modified
      const task= await Task({
        description:req.body.description,
        label:req.body.label,
        owner:req.body.owner,
        duedate: req.body.duedate //change body to user in final
      });
      await task.save()
      res.status(200).send({
        message:"Successfully stored in the database.",
        task:task
      })
  }catch(e){
    res.status(404).send(e)
  }

})
//*******************************************************************************

//Update task *******************************************************************
router.patch('/task/:id',auth,async(req,res)=>{
  const _id=req.params.id
  console.log(req);
  const updates=Object.keys(req.body)
  const allowedUpdates=["description","status","label","duedate"]
  const isValid=updates.every((update)=>{
    return allowedUpdates.includes(update)
  })
    if(!isValid){
      return res.status(400).send({error:"Invalid updates"})
    }
  try{
    const task= await Task.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})
    if(!task){
      return res.status(404).send({error:"No task exists with the following _id"})
    }
    res.send(task)
  }catch(e){
    res.status(500).send(e)
  }
})
//*******************************************************************************

//delete task********************************************************************
router.delete('/tasks/:id', auth, async (req,res)=>{
  try {
    const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
    if(!task){
      return res.status(404).send({Error:"No Task with that task_id"})
    }
    res.send(task)
  } catch (e) {
    res.status(400).send(e)
  }
});
//*******************************************************************************


module.exports=router;
