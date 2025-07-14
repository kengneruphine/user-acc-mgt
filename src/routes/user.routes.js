import { Router } from 'express';
import verifyToken from '../middleware/verifyToken.js';
import {
  getAllUsers,
  getAUser,
  editAUser,
  deleteAUser,
} from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/', verifyToken, getAllUsers);
userRouter.get('/:userId', verifyToken, getAUser);
userRouter.put('/:userId', verifyToken,  editAUser);
userRouter.delete('/:userId', verifyToken,  deleteAUser);

export default userRouter;
