const express = require("express");
const app = express();

const orderRoute = require("../src/routes/orderRoute");
require("dotenv").config();

const connectDB = require("../src/config/mongoConfig");
connectDB();

app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.use("/order", orderRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`order application listening http://localhost:${port}`);
})
