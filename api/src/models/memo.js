// src / models / memo.js
'use strict';

const mongoose = require('mongoose');

// Memo Collection
let MemoSchema = mongoose.Schema({
    title: String,
    description: String,
    link: String,
    categories: [String],
    thumbnails: [Buffer],
    userId: String,
    createdAt: Date
});

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