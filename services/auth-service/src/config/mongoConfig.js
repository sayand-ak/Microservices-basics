// database.js

const mongoose = require("mongoose");

async function connectToMongo() {
    try {
        const connectionString = process.env.AUTH_SERVICE_MONGO_URL;
        await mongoose.connect(connectionString);
        console.log("MongoDB connected successfully...");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
}

module.exports = connectToMongo;
