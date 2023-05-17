import { sign } from '@utils/jwt';
import { catchAsyncError } from '@utils/responseHandler';
import User from '@models/user';

export const createUsr = catchAsyncError(async (body) =>{
    //generate random code
    let verificationCode = Math.floor(100000 + Math.random() * 900000);
    body.verificationCode = verificationCode;
    const user = await User.create({...body});
    const token = await sign({
        id:user.id,
        email:user.email,
    });
    return token;
});

export const login = catchAsyncError(async (user, body) => {
    await user.validatePassword(body.password);
    const token = await sign({
      id: user.id,
      email: user.email,
    });
    return token;
  });
