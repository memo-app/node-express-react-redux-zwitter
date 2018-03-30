// src / server.js
'use strict';

// Imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require('./config/passport');

const config = require('./config');
let routes = require('./routes');

// Setup
let apiServer = express();
apiServer.set('APP_SECRET', config.secret);

// MongoDB (mongoose)
mongoose.connect(config.databaseUrl);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Enable CORS
apiServer.use(cors());

// Body Parser
apiServer.use(bodyParser.urlencoded({ extended: false }));
apiServer.use(bodyParser.json());

// Cookie Parser
apiServer.use(cookieParser());

// Routes
apiServer.use('/api', routes);

// Passport
apiServer.use(passport.initialize());

// Export
module.exports = apiServer;