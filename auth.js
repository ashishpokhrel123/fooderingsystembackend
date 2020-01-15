const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

module.exports.verifyUser = (req,res,next)=>{
let authheader = req.headers.authorization;
if(!authheader){
    let error = new Error("Bearer not set");
    error.status=401;
    return next(error);
}
let token = authheader.spilt('')[1];
let data;
try{
    data = jwt.verify(token, process.env.SECRET);

}catch(err){
    throw new Error("Token could not verfied");
}
User.findById(data._id)
.then((user)=>{
    req.user=user;
    next();
});
}
