import { sign as _sign, verify as _verify } from 'jsonwebtoken';
import env from '@config/env';
/**
 * @param payload
 */

export const sign = function (payload) {
  try {
    const token = _sign({ ...payload, iat: Date.now() }, env.jwt_secret, {
      expiresIn: env.passwordExpiresIn,
    });
    return token;
  } catch (err) {
    return err;
  }
};

export const decode = function (token) {
  try {
    const decoded = _verify(token, env.jwt_secret);
    return decoded;
  } catch (err) {
    return err;
  }
};
