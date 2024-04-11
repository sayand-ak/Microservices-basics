const express = require("express");

const orderRoute = express.Router();

const orderController = require("../controller/orderControlller");

orderRoute.post("/orderProduct", orderController.orderProduct);

module.exports = orderRoute;