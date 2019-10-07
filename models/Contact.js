const mongoose = require('mongoose')

const ContactSchema = mongoose.Schema({
    // A relationship between contacts & users
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users' // refer to a specific collection
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    type: {
        type: String,
        default: 'personal' // The 'type' is either going to be 'personal' or 'professional'
    },
    date: {
        type: Date,
        default: Date.now // current datetime
    },
})

module.exports = mongoose.model('contact', ContactSchema)