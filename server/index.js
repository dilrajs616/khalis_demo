require('dotenv').config();
require('module-alias/register');
const  path = require('path');

// initializing express
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

// setting up views
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, './app/views'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayouts);
app.set('layouts', 'layouts/layout')

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