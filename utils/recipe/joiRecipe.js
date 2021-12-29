import Joi from 'joi';

export const joiRecipe = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().required(),
  public: Joi.boolean().required(),
  userId: Joi.any(),
  prepTime: Joi.number().min(1).required(),
  cookTime: Joi.number().min(1).required(),
  serves: Joi.number().min(1).required(),
  difficulty: Joi.string().required(),
}).required();

export const joiRecipeEdit = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().required(),
  public: Joi.boolean().required(),
  prepTime: Joi.number().min(1).required(),
  cookTime: Joi.number().min(1).required(),
  serves: Joi.number().min(1).required(),
  difficulty: Joi.string().required(),
}).required();
