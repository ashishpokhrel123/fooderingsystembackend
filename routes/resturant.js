const express = require('express');
const Resturant = require('../models/resturant');
const router = express.Router();

router.route('/')
.get((req,res,next)=>{
    Resturant.find({})
    .then((resturant)=>{
        res.status=200;
        res.json(resturant);
    })
    .catch((err)=>(next));
})
.post((req,res,next)=>{
    Resturant.create({
        resturant_name:req.body.resturant_name,
        resturant_address: req.body.resturant_address,
        food_item:req.body.food_item,
        res_image:req.body.res_image
    })
    .then((resturant)=>{
        res.status=201;
        res.json(resturant);
        
    })
    .catch((err)=>(next));
})
.put((req,res,next)=>{
    res.statusCode=401;
    res.send("You cannot add resturant");
})
.delete((req,res,next)=>{
    Resturant.deleteMany({})
    .then((resturant)=>{
        res.json(resturant);
    })
    .catch((err)=>(next));
});

router.route('/:id')
.get((req,res,next)=>{
    Resturant.findById(req.params.id)
    .populate('fooditem')
    .then((resturant)=>{
        res.statusCode=200;
        res.json(resturant);
 
 
    })
    .catch((err)=>(next));
 })
.post((req,res,next)=>{
    res.statusCode=401;
    res.json("You cannot add resturant");
})
.put((req,res,next)=>{
    Resturant.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
    .then((resturant)=>{
        res.statusCode=201;
        res.json(resturant);
    })
    .catch((err)=>(next));
})
.delete((req,res,next)=>{
    Resturant.findByIdAndDelete(req.params.id)
    .then((resturant)=>{
        res.statusCode=200;
        res.json(resturant);
    })
    .catch((err)=>(next));
});

module.exports=router;