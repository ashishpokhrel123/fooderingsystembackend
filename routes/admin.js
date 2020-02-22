const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const router = express.Router();
const auth = require('../adminauth');


router.get('/',(req,res,next)=> {
    Admin.find({})
    .then((admin)=>{
        status=200;
        res.json(admin);

    })
    .catch((err)=>next(err));

})

router.post('/signup', (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            let err =  new Error('Could not hash!');
		err.status = 500;
		return next(err);
        }
        Admin.create({
            name:req.body.name,
            address:req.body.address,
            phone:req.body.phone,
            email:req.body.email,
            username:req.body.username,
            password:hash
          
        }).then((admin) => {
            let token = jwt.sign({_id:admin._id}, process.env.SECRET);
            res.json({ status: "Signup success!", token: token });
        }).catch(next);
    });
});

router.post('/login', (req, res, next) => {
    Admin.findOne({ username: req.body.username })
        .then((admin) => {
            if (admin == null) {
                let err = new Error('User not found!');
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, admin.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match!');
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({ _id: admin._id }, process.env.SECRET);
                        res.json({ status: 'Login success!', token: token });
                    }).catch(next);
            }
        }).catch(next);
})
router.get('/me', auth.verifyAdmin, (req, res, next) => {
    res.json();
    
 });




module.exports = router;