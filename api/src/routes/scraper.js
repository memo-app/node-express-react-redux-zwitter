// src / routes / categories.js
'use strict';

// Imports
const express = require('express');
const validUrl = require('valid-url');
const MetaInspector = require('node-metainspector');

// App Imports
let authMiddleware = require('./middlewares/auth');
let ScrapedContent = require('../models/scrapedContent');

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
    if (!request.query.url) {
        response.status(400).json(noUrlResponse);
    } else if (!validUrl.isWebUri(request.query.url)) {
        response.status(400).json(invalidUrlResponse);
    } else {
        ScrapedContent.findOne({ link: request.query.url }, (error, document) => {
            if (error || !document) {
                getUrlResponse(request.query.url)
                    .then(data => {
                        response.json({ success: true, data: data, errors: [] });
                    })
                    .catch(error => {
                        response.status(400).json({
                            success: false,
                            errors: [{
                                type: 'critical',
                                message: 'Could not fetch data from the URL.'
                            }]
                        });
                    });
            } else {
                response.json({ success: true, data: document.content, errors: [] });
            }
        });

    }
});

const takeMetadata = client => {
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

    return metadata;
}

scraperRoutes.get('/scrape', authMiddleware, (request, response) => {
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
        const process = () => {
            const metadata = takeMetadata(client);

            responseData.data = metadata;
            responseData.success = true;
            response.json(responseData);

            ScrapedContent.findOne({ link: request.query.url }, (error, document) => {
                if (!document) {
                    console.log(`Saving ${request.query.url} to ScrapedContent`);
                    ScrapedContent.create({
                        link: request.query.url,
                        content: client.document
                    });
                }
            });
        }

        client.on("fetch", process);
        client.on("error", function (err) {
            responseData.errors.push({ message: 'Failed to scrape.' });
            response.status(400).json(responseData);
        });

        ScrapedContent.findOne({ link: request.query.url }, (error, document) => {
            if (error || !document) {
                console.log(`Scraping ${request.query.url} ...`);
                client.fetch();
            } else if (document) {
                client.document = document.content;
                client.fetch();
                client.document = document.content;
            }
        });

    }
})

// Export
module.exports = scraperRoutes;