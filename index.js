require('dotenv').config();

const express = require('express');
const app=express();
const cors = require('cors');
require("./db/mongoose.js")
const User = require('./models/usermodel.js');
const Task = require('./models/taskmodel.js');
const userRoute = require('./Routes/userRoute.js');
const taskRoute=require('./Routes/taskroute.js');
const passport = require('passport');
const passport_setup= require('./auth/passport-setup.js')
const path = require('path')


const port=process.env.PORT || 5000

app.use(cors());

app.use(express.json());
//middleware
app.use((req,res,next)=>{
  console.log(req.method, req.path);
  next()
})
app.use(passport.initialize());

app.use(taskRoute);
app.use(userRoute);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build' ,'index.html'));
  })
}

app.listen(port,()=>{
  console.log("Listening to Port : ",port);
})
