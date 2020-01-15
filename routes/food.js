const express = require('express');
const Food  = require('../models/food');
const router = express.Router();

router.route('/')
  //Getting  All food item from database
.get((req,res,next)=>{
    Food.find({})
    .then((food)=>{
        status=200;
        res.json(food);

    })
    .catch((err)=>next(err));

})
 //inserting  new food item to the database
.post((req,res,next)=>{
    Food.create(req.body)
    .then((food)=>{
        res.status=200;
        res.json(food);
    })
    .catch((err) => next(err));



})
.put((req,res,next)=>{
    res.statusCode=201;
    res.json("You cannot update Food");

})
 //Deleting  All food item from database
.delete((req,res,next)=>{
    Food.deleteMany({})
    .then((food)=>{
        res.json(food);

    })
});

 //Getting particular food iteam by id from database
 router.route('/:id')
  .get((req,res,next)=>{
    Food.findById(req.params.id)
     .then((food)=>{
        res.json(food);
     })
     .catch((err) => next(err));
 })
 .post((req,res,next)=>{
     res.statusCode=201;
     res.json("You cannot add food on here");
 })
 //Updating the particular food item by id

 .put((req,res,next)=>{
     Food.findByIdAndUpdate(req.params.id,{$set : req.body},{new:true})
     .then((food)=>{
         res.json(food);

     })
     .catch((err)=> next(err));
 })

 // Deleting particular food by id

 .delete((req,res,next)=>{
     Food.findByIdAndDelete(req.params.id)
     .then((food)=>{
         res.json(food);
     })
     .catch((err)=> next(err));
 })

module.exports= router;


