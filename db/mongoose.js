const mongoose = require('mongoose');

//const keys = require('../keys.js')

mongoose.connect( process.env.MONGO_URL ,{
  useNewUrlParser:true,
  useCreateIndex: true,
  useUnifiedTopology:true
});
