// src / routes / index.js
'use strict';

// Imports
const express = require('express');

// Common Routes
let routes = express.Router();
const tweets = require('./tweets');
const users = require('./users');

routes.use('/tweets', tweets);
routes.use('/users', users);

// Export
module.exports = routes;