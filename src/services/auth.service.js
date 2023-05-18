import { sign } from '@utils/jwt';
import { catchAsyncError } from '@utils/responseHandler';
import User from '@models/user';
import UserAccount from '@models/user_account';
import UserOTPVerification from '../models/userOTPVerification';
import env from '../config/env';
import bcrypt from 'bcrypt';
import transporter from '../config/sendEmail/nodemail';
import crypto from 'crypto';
import PasswordReset from '../models/passwordReset';

export const createUsr = catchAsyncError(async (body) => {
  //store user profile in the user table
  const user = await User.create({ ...body });

  //send the verification email here
  sentOTPVerificationCode(user);
  //create the userAccount for this user
  const userId = user._id.toString();
  const newUserAccount = await new UserAccount({
    identificationNumber: null,
    idImage: null,
    user: userId,
  });
  const userAccount = await newUserAccount.save();
  const token = await sign({
    id: user.id,
    email: user.email,
  });

  const returnDetails = {
    token,
    userAccount,
    user,
  };
  return returnDetails;
});

export const login = catchAsyncError(async (user, body) => {
  await user.validatePassword(body.password);
  const token = await sign({
    id: user.id,
    email: user.email,
  });
  return token;
});

export const forgotPass = catchAsyncError(async (email, redirectUrl) => {
     const user = await User.findOne({ email });
     //generate reset token 
     const resetToken = crypto.randomBytes(32).toString('hex');

     //delete any record from the Password reset model having the user Id
     await PasswordReset.deleteMany({userId: user._id});
     //send reset email here
     const mailOptions = {
      from: env.domain_email,
      to: email,
      subject: 'Password Reset',
      html: `<p>You want to reset your password, use the link below to reset it</p>
            <p>This link <b>expires in 1 hour</b>.</p>
            <p>Click <a href=${redirectUrl + "/" + user._id + "/" + resetToken}>here</a> to proceed. </p>`,
    };

    //hash the reset Token before storing it
    const hashCode = await bcrypt.hash(resetToken, env.salt_rounds);
    const newPasswordReset = await new PasswordReset({
      userId: user._id,
      resetToken: hashCode,
      createdAt: Date.now(),
      updatedAt: Date.now() + 3600000,
    });

    await newPasswordReset.save();
    //send the email here
    await transporter.sendMail(mailOptions);
});

export const resetPass = catchAsyncError(async (resetToken, passwordResetRecord, password) => {
   const {expiresAt} = passwordResetRecord[0];
   const userId = passwordResetRecord[0].userId;
   const tokenFromDatabase = passwordResetRecord[0].resetToken;

   if (expiresAt < Date.now()) {
    await PasswordReset.deleteMany({ userId });
    throw new Error('Reset link has expired');
  } else{
    const validToken = bcrypt.compare(resetToken, tokenFromDatabase);
    if (!validToken) {
      return false;
    } else {
      //success
      const user = await User.findOne({ _id: userId });
      //hash the new provided password and stored it in the database
      await user.updatePassword(password);
      await user.save();
      await PasswordReset.deleteMany({ userId });

      const mailOptions = {
        from: env.domain_email,
        to: email,
        subject: 'Password Reset Succesfully',
        html: `<p>Password Reset Successfully. You can now login</p>`,
      };
      await transporter.sendMail(mailOptions);
      return true;
    }
  }
});

//sent the verification code through email
const sentOTPVerificationCode = catchAsyncError(async ({ _id, email }) => {
  //try {
    //generate random code
    let verificationCode = `${Math.floor(100000 + Math.random() * 900000)}`;
    const mailOptions = {
      from: env.domain_email,
      to: email,
      subject: 'Verify your email',
      html: `<p> Enter <b>${verificationCode}</b> in the app to verify your email address</p>
                <p> This code <b>expires in 1 hour</b>.</p>`,
    };

    //hash the verification code before storing it
    const hashCode = await bcrypt.hash(verificationCode, env.salt_rounds);
    const newCodeVerification = await new UserOTPVerification({
      userId: _id,
      verificationCode: hashCode,
      createdAt: Date.now(),
      updatedAt: Date.now() + 3600000,
    });

    await newCodeVerification.save();
    //send the email here
    await transporter.sendMail(mailOptions);
});

export const codeVerification = catchAsyncError(
  async (verificationCode, userOTPFoundRecord) => {
    const { expiresAt } = userOTPFoundRecord[0];
    const codeFromDatabase = userOTPFoundRecord[0].verificationCode;
    const userId = userOTPFoundRecord[0].userId;

    if (expiresAt < Date.now()) {
      await UserOTPVerification.deleteMany({ userId });
      throw new Error('Code has expired.Please request again');
    } else {
      const validCode = bcrypt.compare(verificationCode, codeFromDatabase);
      if (!validCode) {
        return false;
      } else {
        //success
        //change the user to active
        await User.updateOne({ _id: userId }, { active: true });
        await UserOTPVerification.deleteMany({ userId });
        return true;
      }
    }
  },
);

export const resentCode =  catchAsyncError(async( userId, email) =>{
    await UserOTPVerification.deleteMany({userId});
    sentOTPVerificationCode({_id:userId, email});
    return 'success';
})