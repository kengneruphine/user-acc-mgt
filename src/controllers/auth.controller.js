import { errorResponse, successResponse } from '@utils/responseHandler';
import checkDateOfBirth from '@utils/checkDateOfBirth';
import { registerValidation, loginValidation,passwordResetRequest } from '@utils/validation';
import env from '../config/env';
import { imagekitUploadImage } from '../services/upload';
import User from '@models/user';
import UserAccount from '../models/user_account';
import PasswordReset from '../models/passwordReset';
import logger from '../config/logger';
import UserOTPVerification from '../models/userOTPVerification';
import { sign} from 'jsonwebtoken';
import {
  createUsr,
  login,
  forgotPass,
  resetPass,
  codeVerification,
  resentCode
} from '../services/auth.service';

export const createNewUserProfile = async (req, res) => {
  try {
    const { body } = req;
    checkDateOfBirth(body.dateOfBirth, 'Date of Birth');
    const payload = { ...body };
    const { error } = registerValidation(body);
    if (error) return errorResponse(res, error.details[0].message, 400);

    const existingAccount = await User.findOne({ email: body.email });

    if (existingAccount) {
      return errorResponse(res, 'Account with email already exists', 400);
    }
    //get the age from the date of birth
    const age = Math.floor((new Date() - new Date(body.dateOfBirth).getTime()) / 3.15576e+10);
    payload.age = age;

    if (req.file) {
      const imageUploadPayload = {
        file: req.file.buffer,
        fileName: req.file.originalname,
        folder: `${env.IMAGEKIT_APP_FOLDER}/USERPROFILE`,
      };

      const imageUrl = await imagekitUploadImage(imageUploadPayload);
      if (imageUrl) {
        payload.profileImage = imageUrl;
      }
    }
    
    const returnDetails = await createUsr(payload);
    logger.info(`Token during account creation is ${returnDetails.token}`);

    return successResponse(
      res,
      201,
      'You have successfully created an account',
      returnDetails
    );
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};


export const loginUser = async (req, res) => {
  try {
    const { body } = req;
    const { error } = loginValidation(body);
    if (error) return errorResponse(res, error.details[0].message, 400);

    const user = await User.findOne({ email: body.email });
    if (!user) {
      return errorResponse(res, 'User does not exist', 400);
    }
    //check if the user is active and user_account has being set to verified
    const userAccount = await UserAccount.findOne({user: user._id});
    if (userAccount.accountStatus == "unverified" && user.active !== 'false' ) {
      return errorResponse(res, 'You cannot login,User Account is unverified or your user profile is not active', 400);
    }
    const token = await login(user, body);
    logger.info(`Login success`);
    return successResponse(res, 200, 'You have successfully logged in.', token);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const verifyCode = async(req, res) =>{
  try{
    let { userId, verificationCode } = req.body;
    if(!userId || !verificationCode){
      return errorResponse(res, 'Empty code details are not allowed', 400);
    }
    const userOTPFoundRecord = await UserOTPVerification.find({userId});
    if(userOTPFoundRecord.length<=0){
      return errorResponse(res, 'Account record doesnot exist or has been verified already. Please signup', 400);
    }

    const result = await codeVerification(verificationCode, userOTPFoundRecord);
    if(result){
      return successResponse(res, 200, 'Email verified successfully.');
    }
  }catch (error) {
    return errorResponse(res, error.message, 500);
  }
}

export const resentVerificationCode = async(req, res) =>{
  try{
    let {userId, email } = req.body;
    if(!userId || !email){
      return errorResponse(res, 'Empty email field provided', 400);
    }

    const result = await resentCode(userId, email);
    if(result === 'success'){
      return successResponse(res, 200, 'Code resent successfully.');
    }
    logger.info(`Code resent successfully`);
    
  }catch(error){
    return errorResponse(res, error.message, 500);
  }
}
export const forgotPassword = async (req, res) => {
  try {
    const { body } = req;
    const { email, redirectUrl } = body;
    //check if user exist
    const existingAccount = await User.findOne({ email: body.email });
    if (!existingAccount) {
      return errorResponse(res, 'User doesnot exist', 400);
    }
    if (!existingAccount.active) {
      return errorResponse(res, 'Email has not been verified yet', 400);
    }
    await forgotPass(email, redirectUrl);
    return successResponse(res, 200, 'Password reset link sent');
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const{userId, resetToken, password } = req.body;
    const passwordResetRecord = await PasswordReset.find({userId});
    if (!passwordResetRecord) {
      return errorResponse(res, 'This account doesnot exist', 400);
    }
    const result = await resetPass(resetToken, passwordResetRecord, password);
    if(result){
      return successResponse(res, 200, 'Successfully reset password');
    }else{
      return errorResponse(res, error.message, 500);
    }
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

// to logout, we have to delete the JWT token from the backend
//replace the Jwt token from headers with an empty string and which is going to expire in 5 second
//since the token is not stored in the database
//Here, the token will be cleared from the localStorage in the client application
export const logoutUser = async (req, res) =>{
  const authHeader = req.headers["authorization"];
  sign(authHeader, "", {expiresIn: 5}, (logout, err) =>{
    if (logout) {
      return successResponse(res, 200, 'You have been logged out successfully');
    } 
  else {
    return errorResponse(res, "Error occured", 500);
    }
  })
}
