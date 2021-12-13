const express = require('express');
const mongoose = require('mongoose');
const miniMeUrl = require('./models/miniMeUrl')

// instance of express
const app = express()

// connect to mongoDB
mongoose.connect('mongodb://localhost/minimeShortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

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
    await miniMeUrl.create({ fullLink: req.body.longUrl })
    res.redirect('/')
})

// set up server on port
app.listen(process.env.PORT || 8083);