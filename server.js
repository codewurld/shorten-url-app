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

// access images and static files
app.use(express.static("views"));

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

// find shortened url id from end of localhost address when clicked 
// save to variable and update shortLink property in schema
// if no shortened url, return error
// else update click count and save
// then redirect user to page of full link

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await miniMeUrl.findOne({
        shortLink: req.params.shortUrl
    })

    if (shortUrl == null) {
        return res.sendStatus(404)
    }

    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.fullLink)
})

// set up server on port
app.listen(1337);