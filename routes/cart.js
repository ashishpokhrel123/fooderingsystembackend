const express = require('express');
const Cart = require('../models/cart');
const router = express.Router();
const auth = require('../auth');

router.route('/')
.get((req,res,next)=>{
    Cart.find({})
    .then((cart)=>{
        res.statusCode=200;
        res.json(cart);
    })
})
.post((req,res,next)=>{
    Cart.create(req.body)
    .then((cart)=>{
        res.statusCode=201;
        res.json(cart);

    })
})
.put((req,res,next)=>{
    res.send("Permission denied");
})
.delete((req,res,next)=>{
    Cart.deleteMany({})
    .then((cart)=>{
        res.send("Deleted");
    })
});
router.route('/:id')
get((req,res,next)=>{
    Cart.findById(req.params.id)
    .then((cart)=>{
        res.statusCode=201;
        res.json(cart);
    })
})
post((req,res,next)=>{
    res.send("Permission denied");
})
.put((req,res,next)=>{
    Cart.findByIdAndUpdate(req.params.id,{$set: req.body},{$new:true})
    .then((cart)=>{
        res.statusCode=201;
        res.json(cart);
    })
})
.delete((req,res,next)=>{
    Cart.findByIdAndDelete(req.params.id)
    .then((cart)=>{
        res.send("Deleted")
    })
});

module.exports = router;