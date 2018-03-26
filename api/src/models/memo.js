// src / models / memo.js
'use strict';

const mongoose = require('mongoose');

// Memo Collection
let MemoSchema = mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    categories: {
        type: [String],
        trim: true,
        lowercase: true
    },
    description: String,
    thumbnails: [String],
    userId: {
        type: String,
        required: true,
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    }
});

// Create text index
MemoSchema.index({
    link: 'text',
    title: 'text',
    description: 'text',
},
    {
        default_language: "english",
        weights: {
            link: 7,
            title: 10,
            description: 5
        }
    });

let Memo = mongoose.model('memos', MemoSchema);

module.exports = Memo;