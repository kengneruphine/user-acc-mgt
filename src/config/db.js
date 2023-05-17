import mongoose from 'mongoose';
//import User from '@src/models/user';
import logger from './logger';
import env from './env';

mongoose.Promise = global.Promise;
const db = {
  mongoose,
 // user: User,
};

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const connectToDB = async () => {
  await db.mongoose
    .connect(env.DB_URL, options)
    .then(() => {
      logger.info('Database connected successfully');
    })
    .catch((err) => {
      logger.warn(err);
    });
};

const disconnectDB = async () => {
  await db.mongoose.disconnect();
};

export { connectToDB, disconnectDB };
