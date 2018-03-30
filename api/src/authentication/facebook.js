const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../config');
const User = require('../models/user');

if (config.authentication.facebook) {

    const passportConfig = {
        ...config.authentication.facebook
    };

    passport.use(new FacebookStrategy(passportConfig,
        (accessToken, refreshToken, profile, done) => {
            User.findOrCreate({ "logins.facebook.id": profile.id }, (error, user) => {
                return done(error, user);
            });
        }));

}