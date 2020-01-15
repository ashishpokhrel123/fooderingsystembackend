const mongoose = require('mongoose');
const foodSchema = new mongoose.Schema({
    food:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    resturant:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Resturant'
    }],
    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order'
    }
},{timestamps:true});

module.exports=mongoose.model('Food',foodSchema);