import 'dotenv/config';
import logger from './config/logger.js';
import env from './config/env.js';
import app from './app.js';

app.listen(env.port, () => {
  logger.info(`Server running on port ${env.port}`);
});
