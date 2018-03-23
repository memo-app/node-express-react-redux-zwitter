// src / routes / index.js
'use strict';

// Imports
const express = require('express');

// Common Routes
let routes = express.Router();
const memos = require('./memos');
const users = require('./users');
const categories = require('./categories');

routes.use('/memos', memos);
routes.use('/users', users);
routes.use('/categories', categories);

// Export
module.exports = routes;