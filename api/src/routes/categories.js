// src / routes / categories.js
'use strict';

// Imports
const express = require('express');

// App Imports
const config = require('./../config');
let authMiddleware = require('./middlewares/auth');
let Memo = require('../models/memo');

// Common Routes
let categoryRoutes = express.Router();

// Categories (GET /categories)
categoryRoutes.get('/', authMiddleware, (request, response) => {
    let responseData = {
        success: false,
        data: {},
        errors: []
    };

    // Returns all used categories
    Memo.distinct("categories", { userId: request.user._id }).exec(function (error, documents) {
        if(documents){
            responseData.data = documents;
            responseData.success = true;
        }
        response.json(responseData);
    });

});

// Export
module.exports = categoryRoutes;