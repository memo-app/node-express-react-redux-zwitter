// src / models / memo.js
'use strict';

const mongoose = require('mongoose');

// Memo Collection
let MemoSchema = mongoose.Schema({
    text: String,
    userId: String,
    createdAt: Date
});
MemoSchema.index({ text: 'text' }, { default_language: "english" });
let Memo = mongoose.model('memos', MemoSchema);

module.exports = Memo;