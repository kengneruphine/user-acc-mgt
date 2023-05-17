import express from 'express';
import authRoutes from './auth.routes';

const apiRouter = express.Router();

apiRouter.use('/auth', authRoutes);


export default apiRouter;