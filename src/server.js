import 'dotenv/config';
import logger from '@config/logger';
import env from '@config/env';
import app from './app';

app.listen(env.port, () => {
  logger.info(`Server running on port ${env.port}`);
});
