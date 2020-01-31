const express = require('express');
//const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const auth = require('../auth');

const dotenv = require('dotenv').config();

router.post('/signup',(req,res,next)=>{
    let password = req.body.password;
    bcrypt.hash(password,10,function(err,hash){
        if(err){
            throw new Error("Error in hashing password");
        }
        User.create({
            name:req.body.name,
            address:req.body.address,
            phone:req.body.phone,
            email:req.body.email,
            username:req.body.username,
            password:hash,
            profileimage:req.body.profileimage


        }).then((user)=>{
            let token = jwt.sign({_id:user._id},process.env.SECRET);
            res.json({status: "User Register Succesfully!",token:token});
        }).catch((next));
    });
});
router.post('/login', (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (user === null) {
                let err = new Error('User not found!');
                err.status = 401;
                return next(err);
            }
            bcrypt.compare(req.body.password, user.password, function (err, status) {
                if (!status) {
                    let err = new Error('Password does not match!');
                    err.status = 401;
                    return next(err);
                }
                let token = jwt.sign({ userId: user._id }, process.env.SECRET);
                res.json({ status: 'Login Successful!', token: token });
            });
        }).catch(next);
});

router.get('/me', auth.verifyUser, (req, res, next) => {
    // res.json({ username: req.user.username, firstName: req.user.firstName, lastName: req.user.lastName });
    res.json(req.user);
});
router.put('/me', auth.verifyUser, (req, res, next) => {
    User.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true })
        .then((user) => {
            res.json({ username: user.username, name: user.name, email: user.email,profileimage:user.profileimage });
        })
});





module.exports=router;