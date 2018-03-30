// src / routes / categories.js
'use strict';

// Imports
const express = require('express');
const passport = require('passport');

// App Imports
const token = require('../authentication/token');
const config = require('../config');
const { generateAccessToken } = require('../authentication/token');
let User = require('../models/user');

// Generate the Token for the user authenticated in the request
function generateUserToken(request, response) {
    console.log(request.user);
    const accessToken = token.generateAccessToken(request.user._id);
    response.json({ token: accessToken }).send();
}

// Common Routes
let authRoutes = express.Router();

authRoutes.get('/google',
    passport.authenticate('google', {
        session: false,
        scope: ['profile', 'email']
    }));

authRoutes.get('/google/callback',
    passport.authenticate('google', {
        session: false
    }),
    generateUserToken);

authRoutes.get('/facebook',
    passport.authenticate('facebook', {
        session: false,
        scope: ['email']
    }));

authRoutes.get('/facebook/callback',
    passport.authenticate('facebook', {
        session: false
    }),
    generateUserToken);

// Export
module.exports = authRoutes;