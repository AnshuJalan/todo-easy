const mongoose = require('mongoose');

//const keys = require('../keys.js')

mongoose.connect( process.env.MONGO_URL || "mongodb://127.0.0.1:27017/todo-manager-api",{
  useNewUrlParser:true,
  useCreateIndex: true,
  useUnifiedTopology:true
});
