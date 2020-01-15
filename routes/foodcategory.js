const express = require('express');
const mongoose = require('mongoose');
const FoodCategory = require('../models/foodcategoryr');
const router = express.Router();

router.route('/')
.get((req,res,next)=>{
    FoodCategory.find({})
    .then((category)=>{
        res.statusCode = 200;
        res.json(category);
    })
})
.post((req,res,next)=>{
    FoodCategory.create(req.body)
    .then((category)=>{
        res.statusCode = 201;
        res.json(category);
    })
})
.put((req,res,next)=>{
    res.send("Cannot update");
})
.delete((req,res,next)=>{
    FoodCategory.deleteMany({})
    .then((category)=>{
        res.send("Deleted Succesfully");
    })
});

router.route('/:id')
.get((req,res,next)=>{
    FoodCategory.findById(req.params.id)
    .then((category)=>{
        
        res.statusCode = 200;
        res.json(category);
    })
})
.post((req,res,next)=>{
    res.send("Cannot post");
})
.put((req,res,next)=>{
    FoodCategory.findByIdAndUpdate(req.body.id,{$set: req.body},{new:True})
    .then((category)=>{
        res.statusCode = 200;
        res.json(category);
    })
})
.delete((req,res,next)=>{
    FoodCategory.findByIdAndDelete(req.body.id)
    .then((category)=>{
        res.send("Deleted succefully");
    })
})

module.exports = router;