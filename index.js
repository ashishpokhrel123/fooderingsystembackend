const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
const foodRouter = require('./routes/food');
const uploadRouter = require('./routes/uploads');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');
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


  
  
 
  app.use(express.static(__dirname + "/public"));
  app.options('*', cors());
  app.use(cors());
  app.use(morgan('tiny'));
  app.use(express.json());


  app.use('/users',userRouter);
  app.use('/upload',uploadRouter);
  app.use('/foods',foodRouter);
  app.use('/resturants',resturantRouter);
  app.use('/admin',adminRouter);
 
  app.use(auth.verifyUser);
  app.use('/cart',cartRouter);
  app.use('/order',orderRouter);



 
  
 

  //Listening to Port

  app.listen(PORT,()=>{
    console.log(`App is running at localhost:${PORT}`);
});