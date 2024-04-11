const mongoose = require('mongoose');

const Cart = mongoose.Schema({
    productData: [{
        name: String,
        price: Number,
    }],
    userId: {
        type: String
    }
});

const cartModel = mongoose.model("cartModel", Cart);

module.exports = cartModel;