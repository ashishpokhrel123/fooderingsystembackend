const mongoose = require('mongoose');
const resturantSchema = new mongoose.Schema({
    resturant_name:{
        type:String,
        required:true
    },
    resturant_location:{
        type:String,
        required:true
    },
    res_image:{
        type:String
    },
    
    fooditem:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Food"
    }]
},{timestamps:true});

module.exports = mongoose.model('Resturant',resturantSchema);