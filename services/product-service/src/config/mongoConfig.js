const mongoose = require("mongoose");

function connectDB(){
    const connectionStr = process.env.PRODUCT_SERVICE_MONGO_URL;
    mongoose.connect(connectionStr)
    .then(()=>{
        console.log("Product database connected successfully..");
    })
    .catch(() => {
        console.log('Product database connection error..');
    })
}

module.exports = connectDB;