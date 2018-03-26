// src / routes / categories.js
'use strict';

// Imports
const express = require('express');
const MetaInspector = require('node-metainspector');

// App Imports
let authMiddleware = require('./middlewares/auth');

// Common Routes
let scraperRoutes = express.Router();

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
scraperRoutes.get('/fetch', authMiddleware, (request, response) => {
    console.log(request.query.url);

    getUrlResponse(request.query.url)
        .then(data => {
            response.json({ success: true, data: data, errors: [] });
        })
        .catch(error => {
            response.status(400).json({
                success: false,
                errors: [{ type: 'critical', message: error }]
            });
        })
});

scraperRoutes.get('/scrape', authMiddleware, (request, response) => {
    let responseData = {
        success: false,
        data: {},
        errors: []
    };

    console.log(request.query.url);

    if (!request.query.url) {
        responseData.errors.push({ type: 'critical', message: 'No URL supplied' });
        response.status(400).json(responseData);
    }

    const client = new MetaInspector(request.query.url, { timeout: 5000 });

    client.on("fetch", function() {
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
     
    client.on("error", function(err) {
        responseData.errors.push({ message: 'Failed to scrape' });
        response.status(400).json(responseData);
    });
     
    client.fetch();
})

// Export
module.exports = scraperRoutes;