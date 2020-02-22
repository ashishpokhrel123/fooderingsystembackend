const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/order');
const router = express.Router();

router.route('/')
.get((req,res,next)=>{
    Order.find({ author: req.user._id })
           
    .then((order) => {
        res.json(order);
    }).catch((err) => next(err));
})
.post((req,res,next)=>{
    Order.create(req.body)
    .then((order)=>{
        res.statusCode = 201;
        res.json(order);
    })
})
.put((req,res,next)=>{
    res.send("Cannot update");
})
.delete((req,res,next)=>{
    Order.deleteMany({})
    .then((order)=>{
        res.send("Deleted Succesfully");
    })
});

router.route('/:id')
.get((req,res,next)=>{
    Order.findById(req.params.id)
    .then((order)=>{
        
        res.statusCode = 200;
        res.json(order);
    })
})
.post((req,res,next)=>{
    res.send("Cannot post");
})
.put((req,res,next)=>{
    Order.findByIdAndUpdate(req.body.id,{$set: req.body},{new:True})
    .then((order)=>{
        res.statusCode = 200;
        res.json(order);
    })
})
.delete((req,res,next)=>{
    Order.findByIdAndDelete(req.body.id)
    .then((order)=>{
        res.send("Deleted succefully");
    })
})

module.exports = router;