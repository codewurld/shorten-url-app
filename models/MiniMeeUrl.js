const mongoose = require('mongoose');
const shortId = require('shortId');

// Database schema 
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

module.exports = mongoose.model('MiniMeeUrl', miniMeUrlSchema);