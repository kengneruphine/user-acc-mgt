import User from '@src/models/user';
import { errorResponse, catchAsyncError } from '@utils/responseHandler';

export const verifyUserExists = catchAsyncError(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    return errorResponse(res, 'User does not exist', 400);
  }
  req.user = user;
  return next();
});
