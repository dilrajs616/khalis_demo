require('dotenv').config();
require('module-alias/register');
const  path = require('path');

// initializing express
const express = require('express');
const app = express();
const cors = require('cors');

// setting up views
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
require('@routes/app.routes')(app);

//App Listen Code
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Node app listening on port http://localhost:${port}`);
});

// 404 handler
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});