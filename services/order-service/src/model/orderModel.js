const mongoose = require("mongoose");

const Order = mongoose.Schema({
    productData: [{
        name: String,
        price: Number,
    }],
    userId: {
        type: String
    }
});

const orderModel = mongoose.model("orderModel", Order);
module.exports = orderModel;