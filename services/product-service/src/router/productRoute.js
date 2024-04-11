const express = require("express");

const productRoute = express.Router();

const productController = require("../controller/productController");

productRoute.post("/addProduct", productController.addProduct);

productRoute.post("/buyProduct", productController.buyProduct);

productRoute.post("/addToCart", productController.addToCart);

productRoute.get("/listProducts", productController.listProducts);

module.exports = productRoute;