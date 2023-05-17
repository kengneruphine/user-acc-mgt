import { errorResponse, catchAsyncError } from '@utils/responseHandler';
import { decode } from 'jsonwebtoken';
import env from '../config/env';
import User from '../models/user';

const verifyToken = catchAsyncError(async (req, res, next) => {
  // Verify token
  const bearerToken = req.headers.authorization;
  if (!bearerToken || !(bearerToken.search('Bearer ') === 0)) {
    return errorResponse(res, 'Unauthorized', 401);
  }
  const token = bearerToken.split(' ')[1];
  if (!token) return errorResponse(res, 'Unauthorized', 401);

  // Verify account exists
  const decoded = decode(token, { key: env.jwt_secret });
  if (!decoded) return errorResponse(res, 'Unauthorized', 401);

  const tokenData = await decode(token);
  // Check if the password has be reset since the last time a token was generated
  const lastPasswordChange = await get(`last-password-reset:${tokenData.id}`);
  if (Number(lastPasswordChange) > tokenData.iat) {
    return errorResponse(
      res,
      'Invalid token sent in Authorization header',
      401,
      req,
    );
  }

  req.user = tokenData;

  return next();
});

export default verifyToken;
