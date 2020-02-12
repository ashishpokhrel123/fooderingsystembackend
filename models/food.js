const mongoose = require('mongoose');
const foodSchema = new mongoose.Schema({
    foodname:{
        type:String,
     
    },
    foodimage:{
        type:String
    },
    price:{
        type:Number,
     
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