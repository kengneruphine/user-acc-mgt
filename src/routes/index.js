import express from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import userAccountRoutes from './user_account.routes.js';

const apiRouter = express.Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/user_account', userAccountRoutes);


export default apiRouter;