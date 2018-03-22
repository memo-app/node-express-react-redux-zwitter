// src / routes / index.js
'use strict';

// Imports
const express = require('express');

// Common Routes
let routes = express.Router();
const memos = require('./memos');
const users = require('./users');

routes.use('/memos', memos);
routes.use('/users', users);

// Export
module.exports = routes;