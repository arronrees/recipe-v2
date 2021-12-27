import Joi from 'joi';

export const joiUser = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
}).required();

export const joiUserLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).required();
