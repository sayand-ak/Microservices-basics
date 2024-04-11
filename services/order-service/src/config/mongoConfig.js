const mongoose = require("mongoose");

function connectDB(){
    const conectionStr = process.env.ORDER_SERVICE_MONGO_URL;
    mongoose.connect(conectionStr)
    .then(() => {
        console.log("order database connected successfully..");
    })
    .catch(() => {
        console.log(conectionStr);
        console.log("order database connection error...");
    })
}

module.exports = connectDB;