const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose');
var User = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    // ,
    // total_spot: {
    //     type: Number,
    //     required: true
    // },
    // available: {
    //     type: Number,
    //     required: true
    // },

    // occupied: {
    //     type: Number,
    //     required: true
    // },

    // type: {
    //     type: String,
    //     required: true
    // },
    // link: {
    //     type: String,
    //     required: true
    // },
    // src: {
    //     type: String,
    //     required: true
    // }
}
)

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User)
