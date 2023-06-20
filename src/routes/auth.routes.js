import { Router } from 'express';
import {
  createNewUserProfile,
  loginUser,
  forgotPassword,
  resetPassword,
  verifyCode,
  resentVerificationCode,
  logoutUser
} from '@src/controllers/auth.controller';
import verifyToken from '@src/middleware/verifyToken';
import multer from 'multer';

const authRouter = Router();
const upload = multer().single('profileImage');

authRouter.post('/register',upload, createNewUserProfile);
authRouter.post('/login', loginUser);
authRouter.post('/forgot-password', forgotPassword);
authRouter.put('/logout', logoutUser)
//authRouter.post('/reset-password-confirmation', resetPasswordConfirmation);
authRouter.post('/reset-password', resetPassword);
authRouter.post('/verify-code', verifyCode)
authRouter.post('/resent-code', resentVerificationCode)

export default authRouter;
