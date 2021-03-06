// src / server.js
'use strict';

// Imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require('./authentication/jwt');
require('./authentication/facebook');
require('./authentication/google');

const config = require('./config');
let routes = require('./routes');

// Setup
let apiServer = express();
apiServer.set('APP_SECRET', config.authentication.token.secret);

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

// Passport
apiServer.use(passport.initialize());

// Routes
apiServer.use('/api', routes);

// Export
module.exports = apiServer;