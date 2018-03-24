// src / models / user.js
'use strict';

const mongoose = require('mongoose');

// User Collection
let UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

let User = mongoose.model('users', UserSchema);

module.exports = User;