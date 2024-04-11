const jwt = require("jsonwebtoken");
const User = require("../auth-service/src/models/userModel");

const protect = async(req, res, next) => {
    let token = req.cookies.jwt;
    if(token){ 
        try { 
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decode.user_id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({message: "unauthorized user, invalid token"})
        }
    } else {
        res.status(401).json({message: 'no token'})
    }
};

module.exports =  protect;






