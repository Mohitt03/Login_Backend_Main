const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');
var Parking_Reservation = new Schema({
    Username: {
        type: String
    },
    spot: {
        type: Number
    },
    address: {
        type: String
    },
    date: {
        type: String
    },
    Entry_time: {
        type: String
    },
    Exit_time: {
        type: String
    }
},
    {
        timestamps: true
    }
)

Parking_Reservation.plugin(passportLocalMongoose);

module.exports = mongoose.model('Parking_Reservation', Parking_Reservation)