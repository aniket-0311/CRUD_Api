const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: [true, 'email cannot be blank'],
        unique: [true, 'email already exist'],
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    phoneNumber: Number,
    password: {
        type: String,
        required: [true, 'password cannot be blank'],
        unique: true
    },
    userType: String
})

module.exports =  mongoose.model('User', userSchema);