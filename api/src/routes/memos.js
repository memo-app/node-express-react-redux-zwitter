// src / routes / user.js
'use strict';

// Imports
const express = require('express');
const isEmpty = require('lodash/isEmpty');

// App Imports
const config = require('./../config');
let authMiddleware = require('./middlewares/auth');
let Memo = require('../models/memo');

// Common Routes
let memoRoutes = express.Router();

// Memos (GET /memos)
memoRoutes.get('/', authMiddleware, (request, response) => {
    let responseData = {
        success: false,
        data: {},
        errors: []
    };

    Memo.find({}).sort('-createdAt').exec(function (error, documents) {
        if (documents.length > 0) {
            responseData.data = documents;
            responseData.success = true;
        }

        response.json(responseData);
    });
});

// Memo Add (POST /memos/)
memoRoutes.post('/', authMiddleware, (request, response) => {
    let responseData = {
        success: false,
        data: {},
        errors: []
    };

    if (!isEmpty(request.user)) {
        if (request.body.title != '' && request.body.link) {
            let memo = {
                link: request.body.link,
                title: request.body.title,
                catagories: request.body.catagories,
                description: request.body.description,
                userId: request.user._id,
                createdAt: new Date()
            };

            Memo.create(memo, (error, document) => {
                if (error) {
                    responseData.errors.push({ type: 'critical', message: error });
                } else {
                    let memoId = document._id;

                    if (memoId) {
                        responseData.data.memoId = memoId;
                        responseData.success = true;
                    } else {
                        responseData.errors.push({ type: 'default', message: 'Please try again.' });
                    }
                }

                response.json(responseData);
            });
        } else {
            responseData.errors.push({ type: 'warning', message: 'Supply memo link and title.' });

            response.json(responseData);
        }
    } else {
        responseData.errors.push({ type: 'critical', message: 'You are not signed in. Please sign in to post a memo.' });

        response.json(responseData);
    }
});

// Search Memos (GET /memos/search?searchTerm=123)
memoRoutes.get('/search', authMiddleware, (request, response) => {
    let responseData = {
        success: false,
        data: {},
        errors: []
    };

    if (request.query.searchTerm) {

        Memo.find({
            $text: {
                $search: request.query.searchTerm,
                $language: "english",
                $caseSensitive: false,
                $diacriticSensitive: false
            }
        })
            .skip(request.query.offset || 0)
            .limit(request.query.limit || 10)
            .exec(function (error, results) {
                if (error) {
                    responseData.errors.push(error);
                    response.status(400).send(responseData);
                } else {
                    responseData.success = true;
                    responseData.data = results;
                    response.json(responseData);
                }
            });
    } else {
        responseData.errors.push({type: 'warning', message: 'No search term supplied'});
        response.json(responseData);
    }
});


// Single Memo (GET /memos/id)
memoRoutes.get('/:memoId', authMiddleware, (request, response) => {
    let responseData = {
        success: false,
        data: {},
        errors: []
    };

    if (request.params.memoId) {
        Memo.find({ _id: request.params.memoId }).exec(function (error, documents) {
            if (documents && documents.length > 0) {
                responseData.data = documents[0];
                responseData.success = true;
            }

            response.json(responseData);
        });
    } else {
        response.json(responseData);
    }
});

// Delete Memo (DELETE /memos/id)
memoRoutes.delete('/:memoId', authMiddleware, (request, response) => {
    let responseData = {
        success: false,
        data: {},
        errors: []
    };

    Memo.remove({ _id: request.params.memoId }, error => {
        if (error) {
            responseData.errors.push(error.message);
            response.status(400).send(responseData);
        } else {
            responseData.success = true;
            response.send(responseData);
        }
    })
})

// Export
module.exports = memoRoutes;