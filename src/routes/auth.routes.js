import { Router } from 'express';
import {
  createNewAccount,
  loginUser,
  forgotPassword,
  resetPassword,
  verifyCode,
  resentVerificationCode
} from '@src/controllers/auth.controller';
import multer from 'multer';

const authRouter = Router();
const upload = multer().single('profileImage');

authRouter.post('/register',upload, createNewAccount);
authRouter.post('/login', loginUser);
authRouter.post('/forgot-password', forgotPassword);
//authRouter.post('/reset-password-confirmation', resetPasswordConfirmation);
authRouter.post('/reset-password', resetPassword);
authRouter.post('/verify-code', verifyCode)
authRouter.post('/resent-code', resentVerificationCode)

export default authRouter;
