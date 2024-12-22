const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const vebDizajnController = require('./vebDizajnController');


// Middleware to parse JSON requests
app.use(express.json());
app.use('/api/vebDizajn', vebDizajnController);

// Start the server
app.listen(port, () => {
    console.log(`API is running on http://localhost:${port}`);
});
