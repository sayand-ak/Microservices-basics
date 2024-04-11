const userModel = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const generateToken = require("../auth/generateToken");

const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcryptjs.hash(password, 10);
        console.log('Hashed password:', hashedPassword);
        return hashedPassword;
    } catch (err) {
        console.error('Error hashing password:', err);
        throw err;
    }
};

const verifyLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordMatch = await bcryptjs.compare(password, user.password);

        if (passwordMatch) {
            generateToken(res, user._id);
            res.json({ user: user });
        } else {
            res.status(401).json({ message: "Incorrect password" });
        }
    } catch (error) {
        next(error);
    }
};


const signup = async (req, res, next) => {
    try {
        console.log(req.cookies.jwt);
        const { email, password } = req.body;

        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const encodedPassword = await hashPassword(password);

        const newUser = new userModel({
            email: email,
            password: encodedPassword
        });

        const addedUser = await newUser.save();

        if (addedUser) {
            res.status(201).json({ user: addedUser });
        } else {
            throw new Error("User creation failed");
        }
    } catch (error) {
        next(error);
    }
};



module.exports = {
    verifyLogin,
    signup
};
