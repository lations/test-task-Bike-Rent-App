const mongoose = require('mongoose');

const bikeType = new mongoose.Schema({
    title: {
        type:String,
        enum: ['Road bike','Mountain bike','Hybrid Bike','Cross Bike','Electric bike','Touring bike','Kids bike']
    }
});

module.exports = mongoose.model('BikeType', bikeType);
