import Joi from 'joi';

export const joiRecipe = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().required(),
  public: Joi.boolean().required(),
  userId: Joi.any(),
}).required();
