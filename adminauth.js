const jwt = require('jsonwebtoken');
const Admin = require('./models/Admin');
module.exports.verifyAdmin = (req, res, next) => {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        let err = new Error("Bearer token is not set!");
        err.status = 401;
        return next(err);
    }
    let token = authHeader.split(' ')[1];
    let data;
    try {
        data = jwt.verify(token, process.env.SECRET);
    } catch (err) {
        throw new Error('Token could not be verified!');
    }
    
    Admin.findById(data._id)
        .then((admin) => {
            req.admin = admin;
            next();
        })

        
}

module.exports.verifyLogout = ((req,res,next) =>{
    let token = authHeader.split(' ')[1];
    let data;
    try {
        data = jwt.destroy(token);
    } catch (err) {
        throw new Error('Token could not be verified!');
    }
     return next(err);
}
);