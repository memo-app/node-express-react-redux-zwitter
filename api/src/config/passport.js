// src / config / passport.js
'use-strict';

const passport = require('passport');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const config = require('.');
let User = require('../models/user');

passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromHeader('x-access-token'),
    secretOrKey: config.secret
}, (jwtPayload, callback) => {

    User.findOne({ username: jwtPayload.username }, (error, user) => {
        if (user) {
            return callback(null, user);
        } else {
            return callback(null, false);
        }
    }
    )
}));