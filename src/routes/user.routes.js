import { Router } from 'express';
import verifyToken from '@src/middleware/verifyToken';
import {
  getAllUsers,
  getAUser,
  editAUser,
  deleteAUser,
} from '@src/controllers/user.controller';

const userRouter = Router();

userRouter.get('/', verifyToken, getAllUsers);
userRouter.get('/:userId', verifyToken, getAUser);
userRouter.put('/:userId', verifyToken,  editAUser);
userRouter.delete('/:userId', verifyToken,  deleteAUser);

export default userRouter;
