// src / routes / categories.js
'use strict';

// Imports
const express = require('express');
const passport = require('passport');
const validUrl = require('valid-url');
const MetaInspector = require('node-metainspector');

// App Imports
require('../config/passport');

// Common error responses
const noUrlResponse = {
    success: false,
    errors: [{ type: 'critical', 'message': "No URL." }],
    data: {}
};
const invalidUrlResponse = {
    success: false,
    errors: [{ type: 'critical', 'message': "Invalid URL." }],
    data: {}
};

// Common Routes
let scraperRoutes = express.Router();

// Authentication middleware
scraperRoutes.use(passport.authenticate('jwt', { session: false }));

const getUrlResponse = (url) => {
    return new Promise((resolve, reject) => {
        const http = require('http'),
            https = require('https');

        let client = http;

        if (url.toString().indexOf("https") === 0) {
            client = https;
        }

        client.get(url, (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                resolve(data);
            });

        }).on("error", (err) => {
            reject(err);
        });
    });
};

// Scrape (GET /scraper)
scraperRoutes.get('/fetch', (request, response) => {
    if (!validUrl.isWebUri(request.query.url)) {
        response.status(400).json(invalidUrlResponse);
    } else {
        getUrlResponse(request.query.url)
            .then(data => {
                response.json({ success: true, data: data, errors: [] });
            })
            .catch(error => {
                response.status(400).json({
                    success: false,
                    errors: [{ type: 'critical', message: error }]
                });
            });
    }
});

scraperRoutes.get('/scrape', (request, response) => {
    let responseData = {
        success: false,
        data: {},
        errors: []
    };

    if (!request.query.url) {
        response.status(400).json(noUrlResponse);
    } else if (!validUrl.isWebUri(request.query.url)) {
        response.status(400).json(invalidUrlResponse);
    } else {
        const client = new MetaInspector(request.query.url, { timeout: 5000 });
    
        client.on("fetch", function () {
            let metadata = {};
    
            if (client.title)
                metadata.title = client.title.trim();
            else if (client.ogTitle)
                metadata.title = client.ogTitle.trim();
    
            if (client.description)
                metadata.description = client.description.trim();
            else if (client.ogDescription)
                metadata.description = client.ogDescription.trim();
    
            if (client.keywords)
                metadata.categories = client.keywords.map(kw => kw.trim())
    
            if (client.image)
                metadata.thumbnails = [client.image];
    
            responseData.data = metadata;
            responseData.success = true;
            response.json(responseData);
        });
    
        client.on("error", function (err) {
            responseData.errors.push({ message: 'Failed to scrape' });
            response.status(400).json(responseData);
        });
    
        client.fetch();
    }
})

// Export
module.exports = scraperRoutes;