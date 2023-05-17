import { Router } from 'express';
import {
  createNewAccount,
  loginUser,
  // forgotPassword,
  // resetPasswordConfirmation,
} from '@src/controllers/auth.controller';
import verifyToken from '@src/middleware/verifyToken';
import multer from 'multer';

const authRouter = Router();
const upload = multer().single('image');

authRouter.post('/register',upload, verifyToken, createNewAccount);
authRouter.post('/login', loginUser);
// authRouter.post('/forgot-password', forgotPassword);
// authRouter.post('/reset-password-confirmation', resetPasswordConfirmation);

export default authRouter;
