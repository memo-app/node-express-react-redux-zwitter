const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('../config');
const User = require('../models/user');

if (config.authentication.google) {

    const passportConfig = {
        ...config.authentication.google
    };

    passport.use(new GoogleStrategy(passportConfig,
        (accessToken, refreshToken, profile, done) => {
            User.findOrCreate({ "logins.google.id": profile.id }, (error, user) => {
                return done(error, user);
            });
        }));

}