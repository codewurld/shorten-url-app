const mongoose = require('mongoose');
const shortId = require('shortId');

// import mongoose from 'mongoose'
// import shortId from 'shortid';

// Database schema for accepted data types
// shortId generates new shortId and save in mini url column
const miniMeUrlSchema = new mongoose.Schema({
    fullLink: {
        type: String,
        required: true
    },
    shortLink: {
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('miniMeUrl', miniMeUrlSchema);