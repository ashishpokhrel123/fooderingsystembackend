const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const auth = require('../auth');

router.post('/signup', (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            let err =  new Error('Could not hash!');
		err.status = 500;
		return next(err);
        }
        User.create({
            name:req.body.name,
            address:req.body.address,
            phone:req.body.phone,
            email:req.body.email,
            username:req.body.username,
            password:hash,
            profileimage:req.body.profileimage,
            admin:false
        }).then((user) => {
            let token = jwt.sign({_id:user._id}, process.env.SECRET);
            res.json({ status: "Signup success!", token: token });
        }).catch(next);
    });
});

router.post('/login', (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (user == null) {
                let err = new Error('User not found!');
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match!');
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({ _id: user._id,admin:user.admin }, process.env.SECRET);
                        res.json({ status: 'Login success!', token: token, admin:user.admin });
                    }).catch(next);
            }
        }).catch(next);
})

router.get('/me', auth.verifyUser, (req, res, next) => {
   res.json({ _id: req.user._id, name: req.user.name, address: req.user.address, email:req.user.email, username: req.user.username, profileimage: req.user.profileimage,admin:req.user.admin });
   
});

router.put('/me', auth.verifyUser, (req, res, next) => {
    User.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true })
        .then((user) => {
            res.json({ _id: user._id, firstName: req.user.firstName, lastName: req.user.lastName, username: user.username, image: user.image });
        }).catch(next);
});



module.exports = router;
