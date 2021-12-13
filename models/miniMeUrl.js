const mongoose = require('mongoose');

// Database schema for accepted data types
const miniMeUrlSchema = new mongoose.Schema({
    fullLink: {
        type: String,
        required: true
    },
    shortLink: {
        type: String,
        required: true,
    }
})