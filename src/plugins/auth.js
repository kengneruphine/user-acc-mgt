import { hash as _hash, compare } from 'bcrypt';
import config from '@config/env';

// eslint-disable-next-line consistent-return
export const hashPassword = async (doc, plainPassword = undefined) => {
  let hash;
  if (doc.isNew && doc.password) {
    hash = await _hash(doc.password, config.salt_rounds);
  } else if (plainPassword) {
    hash = await _hash(plainPassword, config.salt_rounds);
  }
  return hash;
};

export const validate = async (doc, plainPassword) => {
  const isValidPassword = await compare(plainPassword, doc.password);
  if (!isValidPassword) {
    throw new Error('Invalid credentials provided. Please try again');
  }
};
