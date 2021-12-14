const express = require('express');
const mongoose = require('mongoose');
const miniMeUrl = require('./models/miniMeUrl')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './config.env') });


// instance of express
const app = express()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected!!');
    } catch (err) {
        console.log('Failed to connect to MongoDB', err);
    }
};

connectDB();

app.set('view engine', 'ejs');

// give express access to url parameters
app.use(express.urlencoded({ extended: false }))

// route
// render index file to display properties 
app.get('/', async (req, res) => {
    // get all url inside of url table
    const miniMeUrls = await miniMeUrl.find();
    // render miniMeUrls in index file in views
    res.render('index', { miniMeUrls: miniMeUrls })
})

// create new short url using miniMeUrl model
// redirect user back to home page after url is shortened
app.post('/shortUrls', async (req, res) => {
    await miniMeUrl.create({ fullLink: req.body.longURL })
    res.redirect('/')
})

// set up server on port
app.listen(1337);