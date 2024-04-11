const express = require("express");
const app = express();
require("dotenv").config();

const cors = require("cors");
app.use(cors({ origin: "*"}));

const connectDB = require("../src/config/mongoConfig");
connectDB();

app.use(express.urlencoded({extended: true}));

app.use(express.json());

const productRoute = require('../src/router/productRoute');

app.use("/product", productRoute);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`product application running http://localhost:${port}/product`);
})