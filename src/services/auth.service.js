import { sign } from '@utils/jwt';
import { catchAsyncError } from '@utils/responseHandler';
import User from '@models/user';
import UserAccount from '@models/user_account';

export const createUsr = catchAsyncError(async (body) =>{
    //generate random code
    let verificationCode = Math.floor(100000 + Math.random() * 900000);
    body.verificationCode = verificationCode;
    const user = await User.create({...body});

    //create the userAccount for this user
    const userId = user._id.toString();
    const newUserAccount = new UserAccount({
        identificationNumber :null,
        idImage :null,
        user:userId
    });
    const userAccount = await UserAccount.create({... newUserAccount});
    const token = await sign({
        id:user.id,
        email:user.email,
    });

    const returnDetails = {
        token,
        userAccount
    }
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
