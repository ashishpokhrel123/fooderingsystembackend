const mongoose = require('mongoose');

const foodcategorySchema = new mongoose.Schema({
    category:{
        type:String,
        required:true
    }

},{timestamps:true});

module.exports=mongoose.model('FoodCategory',foodcategorySchema);