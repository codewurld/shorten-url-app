const mongoose = require('mongoose');
const ShortId = require('shortId');

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
        default: ShortId.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('MiniMeUrl', miniMeUrlSchema);