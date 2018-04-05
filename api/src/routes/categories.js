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

    // Returns all used categories ordered by last use 
    Memo.find({ userId: request.user._id }, { categories: 1 })
        .sort({ 'createdAt': -1 })
        .exec(function (error, documents) {
            if (documents) {
                let result = [];
                let i;

                for (i = 0; i < documents.length; i++) {
                    result = result.concat(documents[i].categories);
                }

                responseData.data = [...new Set(result)];
                responseData.success = true;
            }
            response.json(responseData);
        });

});

// Export
module.exports = categoryRoutes;