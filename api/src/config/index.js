// src / config / index.js
'use strict';

const env = process.env.NODE_ENV || 'development';
module.exports = require(`${__dirname}/${env}.json`);