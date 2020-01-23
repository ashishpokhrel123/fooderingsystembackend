const mongoose = require('mongoose');
const locationSchema = new mongoose.Schema({

    lat:{
        type:Number,
        require:true
    },
    lon:{
        type:Number,
        require:true
    }
},{timestamps:true});


module.exports  = mongoose.model('Location',locationSchema);