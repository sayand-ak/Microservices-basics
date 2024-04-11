const mongoose = require('mongoose');

const User = mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    }
});

const userModel = mongoose.model("userModel", User);

module.exports = userModel;