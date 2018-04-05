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

    // Returns all used categories ordered by last use 
    Memo.find({ userId: request.user._id },{categories: 1})
        .sort({'createdAt': -1})
        .exec(function (error, documents) {
        if(documents){  
            let result = [];
            let i;
            
            for( i = 0; i < documents.length; i++){
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