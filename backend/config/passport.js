const passport = require('passport');
const googleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../model/user");
passport.use(new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/auth/google/callback"

}, async(accessToken , refreshToken, profile, done )=>{
    let user = await User.findOne({googleid: profile.id});
    if (!user) {
        user = new User({ username: profile.displayName, googleid: profile.id });
        await user.save();
    }
    
    return done(null, user);

}))