import express from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import userAccountRoutes from './user_account.routes';

const apiRouter = express.Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/user_account', userAccountRoutes);


export default apiRouter;