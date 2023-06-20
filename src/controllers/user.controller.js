import User from '@models/user';
import { errorResponse, successResponse } from '@utils/responseHandler';
import {
  getUsers,
  getUser,
  editUser,
  deleteUser,
} from '@services/user.service';

export const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();
    return successResponse(res, 200, 'Users retrieved successfully', users);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const getAUser = async (req, res) => {
  try {
    //check to make sure that the user only see the details of his account
    if(req.user.id !== req.params.userId){
      return errorResponse(res, 'User cannot see the user details', 400);
    }
    const user = await getUser(req.params.userId);
    if (!user) {
      return errorResponse(res, 'User does not exist', 400);
    }
    return successResponse(res, 200, 'User retrieved successfully', user);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const editAUser = async (req, res) => {
  try {
    //check to make sure that the user only edit his account
    if(req.user.id !== req.params.userId){
      return errorResponse(res, 'User cannot edit this account', 400);
    }
    const update = req.body;
    const userExist = await User.findById(req.params.userId);
    if (!userExist) {
      return errorResponse(res, 'User does not exist', 400);
    }

    const user = await editUser(req.params.userId, update, userExist);

    return successResponse(res, 200, 'User updated successfully', user);
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const deleteAUser = async (req, res) => {
  try {
    const userExist = await User.findById(req.params.userId);
    if (!userExist) {
      return errorResponse(res, 'User does not exist', 400);
    }
    await deleteUser(req.params.userId);
    return successResponse(res, 204, 'User deleted successfully');
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};
