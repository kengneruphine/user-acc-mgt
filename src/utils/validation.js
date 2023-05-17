import Joi from 'joi';
import { joiPasswordExtendCore} from 'joi-password';
const joiPassword = Joi.extend(joiPasswordExtendCore);

export function registerValidation(data) {
    const schema = Joi.object({
      firstName: Joi.string().required().trim(),
      lastName: Joi.string().required().trim(),
      email: Joi.string().email().required().lowercase()
        .trim(),
      password: joiPassword.string()
      .minOfSpecialCharacters(1)
      .minOfUppercase(1)
      .noWhiteSpaces()
      .min(10)
      .required()
      .message({
        'password.minOfSpecialCharacters':'{#label} should contain at least {#min} special character',
        'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
        'password.noWhiteSpaces': '{#label} should not contain white spaces',
      }),
      nationality: Joi.string().required().trim(),
      gender:Joi.string().valid('male','female'),
      maritalStatus: Joi.string().valid('single', 'married','divorced','widowed'),
      status:Joi.string().valid('unverified', 'pending verification','verified'),
      profileImage:Joi.string().uri(),
      dateOfBirth:Joi.date().required(),
    });
    return schema.validate(data);
  }

  export function loginValidation(data) {
    const schema = Joi.object({
      email: Joi.string().email().required().lowercase()
        .trim(),
      password: Joi.string().required().trim(),
    });
    return schema.validate(data);
  }

