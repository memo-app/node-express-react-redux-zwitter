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
MemoSchema.index({ text: 'text' }, { default_language: "english" });
let Memo = mongoose.model('memos', MemoSchema);

module.exports = Memo;