const express = require('express');
const { exec } = require('child_process')
const logger = require('./logger');

const app = express();
app.post('/server', (req, res) => {
  exec("bash ./pipeline/cmd.sh", (error, stdout, stderr) => {
    if (error) {
      logger.error(`Command Error: ${error}`);
      return;
    }
    if (stderr) {
      logger.error(`Output Error: ${stderr}`);
      return;
    }
    logger.info(`Output: ${stdout}`);
    res.send('Successful.\n');
  });
});

const port = 30000;
app.listen(port, () => logger.info(`Listening on port ${port}`));