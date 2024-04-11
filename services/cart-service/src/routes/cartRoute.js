const express = require("express");

const cartRoute = express.Router();

const cartController = require("../controller/cartController");

cartRoute.get("/listCart", cartController.listCart);

module.exports = cartRoute;