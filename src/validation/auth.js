import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .trim()
    .lowercase()
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.base': 'Email must be a string',
      'string.email': 'Email must be a valid address with .com or .net domain',
      'any.required': 'Email is required',
    }),
  password: Joi.string()
    .min(8).max(30)
    .required()
    .messages({
      'string.base': 'Password must be a string.',
      'string.empty': 'Password cannot be empty.',
      'string.min': 'Password must be at least 8 characters long.',
      'any.required': 'Password is required.',
    }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please enter a valid email address',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
  }),
});
