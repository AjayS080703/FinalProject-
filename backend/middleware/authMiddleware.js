const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to verify JWT token
const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; 
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded User", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
};

// Middleware to check the role
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
};

module.exports = { protect, authorize }; 
