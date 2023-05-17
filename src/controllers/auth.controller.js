import { errorResponse, successResponse } from '@utils/responseHandler';
import checkDateOfBirth from '@utils/checkDateOfBirth';
import { registerValidation, loginValidation } from '@utils/validation';
import env from '../config/env';
import { imagekitUploadImage } from '../services/upload';
import User from '@models/user';
import logger from '../config/logger';
import {
  createUsr,
  login,
  // forgotPass,
  // resetPassCon,
} from '../services/auth.service';

export const createNewAccount = async (req, res) => {
  try {
    const { body } = req;
    checkDateOfBirth(body.dateOfBirth, 'Date of Birth');
    const payload = { ...body };
    const { error } = registerValidation(payload);
    if (error) return errorResponse(res, error.details[0].message, 400);

    const existingAccount = await User.findOne({ email: body.email });

    if (existingAccount) {
      return errorResponse(res, 'Account with email already exists', 400);
    }

    //get the age from the date of birth

    if (req.file) {
      const imageUploadPayload = {
        file: req.file.buffer,
        fileName: req.file.originalname,
        folder: `${env.IMAGEKIT_APP_FOLDER}/${env.IMAGEKIT_ENV}/USERPROFILE`,
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
      returnDetails.token,
      returnDetails.userAccount
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
      return errorResponse(res, 'Account does not exist', 400);
    }
    if (user.state === 'false') {
      return errorResponse(res, 'Account is inactive', 400);
    }
    const token = await login(user, body);

    return successResponse(res, 200, 'You have successfully logged in.', token);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};
