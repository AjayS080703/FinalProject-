const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require('../Models/User');

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { userName, email, password, role } = req.body; 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        
        const user = new User({ userName, email, password, role });
        
        await user.save();
        res.json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration Error:", error); 
        res.status(500).json({ error: "Error registering user" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) 
            return res.status(401).json({ message: "Invalid Credentials" });
        
        res.json({ token : jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET,{ expiresIn: '1h' }) });
})

router.get('/google', passport.authenticate('google', {scope:['profile', 'email']}));
router.get('/google/callback', passport.authenticate('google',{failureRedirect: '/'}), 
(req,res)=>{
    res.redirect('/dashboard');
});
passport.serializeUser((user,done)=>{
    done(null,user.id) 
});

passport.deserializeUser(async(id,done)=>{
    const user = await User.findById(id);
    done(null,user);
});

module.exports = router;

