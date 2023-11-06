const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');
var Parking = new Schema({
    parking_number: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    security_star: {
        type: String,
        required: true
    },
    total_spot: {
        type: Number,
        required: true
    },
    available: {
        type: Number,
        required: true
    },

    occupied: {
        type: Number,
        required: true
    },

    type: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    src: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

Parking.plugin(passportLocalMongoose);

module.exports = mongoose.model('Parking', Parking)
