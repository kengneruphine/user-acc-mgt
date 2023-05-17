import { catchAsyncError } from '@utils/responseHandler';
import userAccountModel from '../models/user_account';
import user from '../models/user';

export const populateUserParams = {
    path: 'user',
    select: '_id firstName lastName',
  };


export const uploadIdentificationDocument = catchAsyncError(async (userAccountId, update) =>{
    update.accountStatus = "pending verification";
    documents = await userAccountModel.findByIdAndUpdate(
        userAccountId,
        { $set: update},
        { new: true },
      ).populate(populateUserParams);

      return documents;
})

export const getAllUserAccountDocuments = catchAsyncError(async () => {
    const userAccountDocuments = await userAccountModel
      .find({})
      .populate(populateUserParams);
  
    return userAccountDocuments;
  });
  
  export const getUserAccountDocument = catchAsyncError(async (userAccountId) => {
    const userAccountDocument = await userAccountModel
      .findById(userAccountId)
      .populate(populateUserParams);
  
    return userAccountDocument;
  });
  
 export const deleteUserAccountDocument = catchAsyncError(async (userAccountId) => {
    await userAccountModel.findByIdAndRemove(userAccountId);
  
    return 'success';
  });

  export const documentVerificationCompleted = catchAsyncError(async (userAccountId) => {
    const userAccount = await userAccountModel.findByIdAndUpdate(userAccountId, {
        accountStatus: 'verified'
      }, {
        new: true,
      });
      await userAccount.populate(populateUserParams);

      //change the status of the user profile to active so that the user can login
      await user.findByIdAndUpdate(userAccount.user._id, {
        active: true
      },{
        new:true,
      });
      return userAccount;
  })
