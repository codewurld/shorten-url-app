const express = require('express');

// instance of express
const app = express()

// set up server on port
app.listen(process.env.PORT || 8080);