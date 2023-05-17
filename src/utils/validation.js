import Joi from 'joi';

export function registerValidation(data) {
    const schema = Joi.object({
      firstName: Joi.string().required().trim(),
      lastName: Joi.string().required().trim(),
      password: Joi.string().required().trim(),
      age: Joi.number().required().trim(),
      nationality: Joi.string().required().trim(),
      marital_status: Joi.string().valid('single', 'married','divorced','widowed'),
      status:Joi.string().valid('unverified', 'pending verification','verified'),
      profile_photo:Joi.string().required(),
      date_of_birth:Joi.date().required(),
    });
    return schema.validate(data);
  }

