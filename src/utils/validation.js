import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';
const joiPassword = Joi.extend(joiPasswordExtendCore);

export function registerValidation(data) {
  const schema = Joi.object({
    firstName: Joi.string().required().trim(),
    email: Joi.string().email().required().lowercase().trim(),
    lastName: Joi.string().required().trim(),
    nationality: Joi.string().required().trim(),
    dateOfBirth: Joi.string().required(),
    password: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfUppercase(1)
      .noWhiteSpaces()
      .message({
        'password.minOfSpecialCharacters':
          '{#label} should contain at least {#min} special character',
        'password.minOfUppercase':
          '{#label} should contain at least {#min} uppercase character',
        'password.noWhiteSpaces': '{#label} should not contain white spaces',
      })
      .required(),
    maritalStatus: Joi.string().valid(
      'single',
      'married',
      'divorced',
      'widowed',
    ),
    gender: Joi.string().valid('male', 'female'),
  });
  return schema.validate(data);
}

export function loginValidation(data) {
  const schema = Joi.object({
    email: Joi.string().email().required().lowercase().trim(),
    password: Joi.string().required().trim(),
  });
  return schema.validate(data);
}

export function userAccountValidation(data) {
  const schema = Joi.object({
    idImage: Joi.string().uri(),
    identificationNumber: Joi.string().required().trim(),
  });
  return schema.validate(data);
}
