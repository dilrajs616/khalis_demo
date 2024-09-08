const express = require('express');
const app = express();
require('dotenv').config();
require('module-alias/register');

app.use(express.json());

require('@routes/app.routes')(app);

const port = process.env.PORT || 3000;
//App Listen Code
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