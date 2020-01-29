const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const userRouter = require('./routes/user');
const foodRouter = require('./routes/food');
const uploadRouter = require('./routes/uploads');
const resturantRouter = require('./routes/resturant');
const dotenv = require('dotenv').config();

const url = 'mongodb://localhost:27017/foodorderingsystem'
const PORT = 3002;
const app = express();
const auth = require('./auth');
const cors = require('cors');

   
  //Connecting with Mongodb serve
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then((db)=>{
      console.log("Succesfully connected to mongodb server");
  },(err)=>console.log(err));


  app.use(express.json());
  app.use(morgan('tiny'));
  app.options('*',cors());
  app.use(express.urlencoded({extended: true }));
  app.use(express.static(__dirname +"public"));
  //Connecting to Router

  app.use('/users',userRouter);
  app.use('/upload',uploadRouter);
  app.use(auth.verifyUser);
  app.use('/foods',foodRouter);
  app.use('/resturants',resturantRouter);

  //Listening to Port

  app.listen(PORT,()=>{
    console.log(`App is running at localhost:${PORT}`);
});