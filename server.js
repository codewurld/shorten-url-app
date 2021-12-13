const express = require('express');

// instance of express
const app = express()

app.set('view engine', 'ejs')

// route
// render index file to display properties 
app.get('/', (req, res) => {
    res.render('index')
})

// set up server on port
app.listen(process.env.PORT || 8080);