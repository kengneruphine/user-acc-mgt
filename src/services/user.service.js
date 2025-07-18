import UserModel from '../models/user.js';
import { catchAsyncError } from '../utils/responseHandler.js';
import UserAccount from '../models/user_account.js';

export const getUsers = catchAsyncError(async () => {
  const users = await UserModel.find().select('-password');
  return users;
});

export const getUser = catchAsyncError(async (userId) => {
  const userFound = await UserModel.findById(userId).select('-password');
  const userAccount = await UserAccount.findOne({user: userId}).select('-_id').select('-user');
  const user= {
    userFound,
    userAccount
  } 
  return user;
});

export const editUser = catchAsyncError(async (userId, payload, user) => {
  let update = payload;
  if (update.password) {
    const newPassword = await user.updatePassword(update.password);
    update = { ...update, password: newPassword };
  }

  if(update.dateOfBirth){
    //subtract from the current date to have the age
    const newAge =Math.floor((new Date() - new Date(dateOfBirth).getTime()) / 3.15576e+10)
    update = { ...update, age: newAge };
  }

  const userDetails = await UserModel.findByIdAndUpdate(userId, update, {
    new: true,
  });
  return userDetails;
});

export const deleteUser = catchAsyncError(async (userId) => {
  const user = await UserModel.findByIdAndRemove(userId);
  return user;
});
