// src / routes / categories.js
'use strict';

// Imports
const express = require('express');
const passport = require('passport');

// App Imports
const config = require('./../config');
let Memo = require('../models/memo');
require('../authentication/jwt');

// Common Routes
let categoryRoutes = express.Router();

// Athentication Middleware
categoryRoutes.use(passport.authenticate('jwt', { session: false }));

// Categories (GET /categories)
categoryRoutes.get('/', (request, response) => {
    let responseData = {
        success: false,
        data: {},
        errors: []
    };

    // Returns all used categories
    Memo.distinct("categories", { userId: request.user._id }).exec(function (error, documents) {
        if (documents) {
            responseData.data = documents;
            responseData.success = true;
        }
        response.json(responseData);
    });

});

// Export
module.exports = categoryRoutes;