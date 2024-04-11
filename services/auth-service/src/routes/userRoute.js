const userController = require("../controller/userController");

const { Router } = require("express");

const userRoute = Router();

userRoute.post('/verifyLogin', userController.verifyLogin);

userRoute.post('/signup', userController.signup);

module.exports = userRoute;