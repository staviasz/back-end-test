import * as Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().required().min(3).max(50).messages({
    'any.required': 'The name field is required',
    'string.empty': 'The name field is required',
  }),
  email: Joi.string().required().email().messages({
    'any.required': 'The email field is required',
    'string.empty': 'The email field is required',
  }),
  password: Joi.string().required().min(3).max(20).messages({
    'any.required': 'The password field is required',
    'string.empty': 'The password field is required',
  }),
  passwordConfirmation: Joi.string().required().min(3).max(20).messages({
    'any.required': 'The passwordConfirmation field is required',
    'string.empty': 'The passwordConfirmation field is required',
  }),
});
