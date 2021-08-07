const mongoose = require('mongoose');

const bike = new mongoose.Schema({
    name:String,
    type:{
        type:String,
        enum: ['Road bike','Mountain bike','Hybrid Bike','Cross Bike','Electric bike','Touring bike','Kids bike']
    },
    price: {
        type:Number,
        default:12
    },
    status: {
        type:String,
        enum:['available','rented']
    },
    rentDate: {
        type:Number,
        default:0
    }
});

module.exports = mongoose.model('Bike', bike);
