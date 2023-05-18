import { Schema, model } from 'mongoose';
import handleCastError from '../plugins/handleCastError';
import { hashPassword, validate } from '../plugins/auth';

const userSchema = Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      //in the format YYYY-MM-DD
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    maritalStatus: {
      type: String,
      required: true,
      default: 'single',
      enum: ['single', 'married', 'divorced', 'widowed'],
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    age: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

userSchema.plugin(handleCastError);

/**
 * Pre-save hook for hashing passwords the first time a user creates an account.
 * @param next mongoose hook next function
 */
userSchema.pre('save', async function updatePassword(next) {
  const hash = await hashPassword(this);
  this.password = hash;
  next();
});

/**
 * Mongoose document instance method used to check if a plain text
 * matches the password field of a user's document
 * @param plainText plain text password to be validated
 */
userSchema.methods.validatePassword = async function validatePassword(
  plainText,
) {
  await validate(this, plainText);
};

/**
 * Mongoose document instance method used for hashing a user's updated password.
 * @param plainText plain text password to be encrypted.
 */
userSchema.methods.updatePassword = async function updatePassword(plainText) {
  const hash = await hashPassword(this, plainText);
  this.password = hash;
  return hash;
};

const User = model('User', userSchema);
export default User;
