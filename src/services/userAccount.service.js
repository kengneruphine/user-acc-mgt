import { catchAsyncError } from '../utils/responseHandler.js';
import userAccountModel from '../models/user_account.js';
import User from '../models/user.js';
import env from '../config/env.js';
import transporter from '../config/sendEmail/nodemail.js';

export const populateUserParams = {
    path: 'user',
    select: '_id firstName lastName',
  };


export const uploadIdentificationDocument = catchAsyncError(async (userAccountId, update) =>{
    update.accountStatus = "pending verification";
    let documents = await userAccountModel.findByIdAndUpdate(
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

      //send an email to notify the user
      const user = await User.findById({ _id: userAccount.user._id.toString() })
      const mailOptions = {
        from: env.domain_email,
        to: user.email,
        subject: 'User Account Verified Successfully',
        html: `<p>Your account has being verified successfully. You can now login</p>`,
      };
      await transporter.sendMail(mailOptions);
      return userAccount;
  })
