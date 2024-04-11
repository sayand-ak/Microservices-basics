const mongoose = require("mongoose");

const Product = mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    uid: {
        type: String
    },
    pid: {
        type: Number
    }
})

const productModel = mongoose.model("productModel", Product);

module.exports = productModel;
