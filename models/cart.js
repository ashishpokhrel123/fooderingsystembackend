const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    food:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Food"
    
    },
    totalprice:{

        type:Number
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    quanity : {
        type: Number
    }

},{timestamps:true});

module.exports = mongoose.model('Cart',cartSchema);