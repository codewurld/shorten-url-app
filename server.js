const express = require('express');
const mongoose = require('mongoose');

// instance of express
const app = express()

// connect to mongoDB
mongoose.connect('mongodb://localhost/minimeShortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.set('view engine', 'ejs')

// route
// render index file to display properties 
app.get('/', (req, res) => {
    res.render('index')
})

app.post('/shortUrls', (req, res) => {

})

// set up server on port
app.listen(process.env.PORT || 8082);