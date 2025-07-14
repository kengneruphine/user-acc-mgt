import { errorResponse, catchAsyncError } from '../utils/responseHandler.js';
import { decode } from 'jsonwebtoken';
import env from '../config/env.js';

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
  req.user = decoded;

  return next();
});

export default verifyToken;
