const express = require('express');
var cors = require('cors')
const app = express();
const port = process.env.PORT || 4000;
const vebDizajnController = require('./vebDizajnController');
var defaultCors = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
app.use(cors(defaultCors));
// Middleware to parse JSON requests
app.use(express.json());
app.use('/api/vebDizajn', vebDizajnController);

// Start the server
app.listen(port, () => {
    console.log(`API is running on http://localhost:${port}`);
});
