// src / routes / index.js
'use strict';

// Imports
const express = require('express');

// Common Routes
let routes = express.Router();
const auth = require('./auth');
const memos = require('./memos');
const users = require('./users');
const categories = require('./categories');
const scraper = require('./scraper');

routes.use('/auth', auth);
routes.use('/memos', memos);
routes.use('/users', users);
routes.use('/categories', categories);
routes.use('/scraper', scraper);

// Export
module.exports = routes;