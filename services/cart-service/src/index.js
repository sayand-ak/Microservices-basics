require('dotenv').config();

const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const cors = require("cors");

app.use(cors({
    origin: "*",
}));


const cookies = require("cookie-parser");

const cartRoute = require("../src/routes/cartRoute");

const mongoConnect = require("./config/mongoConfig");
mongoConnect()

app.use(cookies())


app.use("/cart", cartRoute);

const port = process.env.PORT || 6000;

app.listen(port, () => {
    console.log(`cart service listening @ http://localhost:${port}`);
})