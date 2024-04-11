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

const userRoute = require("../src/routes/userRoute");

const mongoConnect = require("./config/mongoConfig");
mongoConnect()

app.use(cookies())


app.use("/auth", userRoute);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`auth service listening @ http://localhost:${port}`);
})