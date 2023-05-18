import { errorResponse, successResponse } from '@utils/responseHandler';
import env from '../config/env';
import { imagekitUploadImage } from '../services/upload';
import logger from '../config/logger';
import { userAccountValidation } from '@utils/validation';
import {
  uploadIdentificationDocument,
  getAllUserAccountDocuments,
  getUserAccountDocument,
  deleteUserAccountDocument,
  documentVerificationCompleted,
} from '@services/userAccount.service';

export const uploadDocuments = async (req, res) => {
  try {
    const { userAccountId } = req.params;
    const { body } = req;
    const { error } = userAccountValidation(body);
    if (error) return errorResponse(res, error.details[0].message, 400);

    const userAccount = await getUserAccountDocument(userAccountId);
    if (userAccount) {
      if (req.file) {
        const imageUploadPayload = {
          file: req.file.buffer,
          fileName: req.file.originalname,
          folder: `${env.IMAGEKIT_APP_FOLDER}/USERACCOUNT`,
        };

        const imageUrl = await imagekitUploadImage(imageUploadPayload);

        if (imageUrl) {
          body.idImage = imageUrl;
        }
      }
      const uploadDoc = await uploadIdentificationDocument(userAccountId, body);

      return successResponse(
        res,
        200,
        'Documents uploaded successfully, account status changed to pending',
        uploadDoc,
      );
    }
    return errorResponse(res, 'user Account not found', 404);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const getAllUserAccount = async (req, res) => {
    try {
      const userAccounts = await getAllUserAccountDocuments();
  
      return successResponse(
        res,
        200,
        'User accounts retrieved successfully',
        userAccounts,
      );
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  };
  
  export const getUserAccount = async (req, res) => {
    try {
      const { userAccountId } = req.params;
      const userAccount = await getUserAccountDocument(userAccountId);
  
      if (!userAccount) return errorResponse(res, 'userAccount not found', 404);
  
      return successResponse(
        res,
        200,
        'UserAccount retrieved successfully',
        userAccount,
      );
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  };

  export const deleteUserAccount = async (req, res) => {
    try {
      const { userAccountId } = req.params;
      const userAccount = await getUserAccountDocument(userAccountId);
  
      if (userAccount) {
        const message = await deleteUserAccountDocument(userAccountId);
  
        return successResponse(
          res,
          200,
          'user Account deleted successfully',
          message,
        );
      }
      return errorResponse(res, 'user Account not found', 404);
    } catch (error) {
      return errorResponse(res, error.message, 500);
    }
  };
  
  // change the status of the account after verification
  export const updateUserAccountStatus = async (req, res) => {
    try {
      const { userAccountId } = req.params;
  
      const userAccount = await getUserAccountDocument(userAccountId);
  
      if (!userAccount) return errorResponse(res, 'user Account not found', 404);
  
      const result = await documentVerificationCompleted(userAccountId);
      return successResponse(res, 200, 'User account verified successfully', result);
    } catch (err) {
      return errorResponse(res, err.message, 500);
    }
  };