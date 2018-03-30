const passport = require('passport');
const passportJwt = require('passport-jwt');
const JwtStrategy = passportJwt.Strategy;
const extractJwt = passportJwt.ExtractJwt;
const config = require('../config');
const User = require('../models/user');

const jwtOptions = {
    jwtFromRequest: extractJwt.fromHeader('x-access-token'),
    secretOrKey: config.authentication.token.secret
};

passport.use(new JwtStrategy(jwtOptions, (payload, done) => {
    User.findOne({ username: payload.username }, (error, user) => {
        if (user) {
            const tokenPayload = {
                _id: payload.id,
                username: payload.username
            }
            return done(null, user, tokenPayload);
        } else {
            return done(null, false);
        }
    });

}));