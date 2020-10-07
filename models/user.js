const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 4,
        max: 16
    },
    email: {
        type: String,
        require: true,
        min: 6,
        max: 24
    },
    password: {
        type: String,
        require: true,
        min: 8,
        max: 32
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('users', userSchema);
