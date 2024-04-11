const mongoose = require("mongoose");

function connectDB(){
    const conectionStr = process.env.CART_SERVICE_MONGO_URL;
    mongoose.connect(conectionStr)
    .then(() => {
        console.log("cart database connected successfully..");
    })
    .catch(() => {
        console.log(conectionStr);
        console.log("cart database connection error...");
    })
}

module.exports = connectDB;