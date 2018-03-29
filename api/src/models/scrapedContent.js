// src / models / user.js
'use strict';

const mongoose = require('mongoose');

// User Collection
let ScrapedContentSchema = mongoose.Schema({
    link: {
        type: String,
        index: true,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

let ScrapedContent = mongoose.model('scrapedContent', ScrapedContentSchema);

module.exports = ScrapedContent;