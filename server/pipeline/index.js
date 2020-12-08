const express = require('express');
const logger = require('./logger');

const app = express();
app.get('/', (req, res) => {
  res.send('<h1> Hello World! </h1>');
});

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Listening on port ${port}`));