import Joi from 'joi';

const document = Joi.string().regex(new RegExp('^[1-9]{1}[0-9]{5,9}$')).min(6).max(10);

const id = Joi.string().regex(new RegExp('^[1-9]{1}[0-9]*$'));

const result = Joi.number();

const names = Joi.string().regex(new RegExp('^[a-zA-ZÀ-ÿ \\u00f1 \\u00d1 \\s]+$')).min(3).max(20)
  .messages({
    'string.base': 'names must be a string',
    'string.pattern.base': 'Error in names field',
    'string.max': 'names length must be less than or equal to 20 characters long',
    'string.min': 'names length must be at least 3 characters long',
    'any.required': 'names field is requerid'
  });
const surnames = Joi.string().regex(new RegExp('^[a-zA-ZÀ-ÿ \\u00f1 \\u00d1 \\s]+$')).min(3).max(30)
  .messages({
    'string.base': 'surnames must be a string',
    'string.pattern.base': 'Error in surnames field',
    'string.max': 'surnames length must be less than or equal to 30 characters long',
    'string.min': 'surnames length must be at least 3 characters long',
    'any.required': 'surnames field is requerid'
  });
const cellphone = Joi.string().regex(new RegExp('^[3]{1}[0-9]{9}$')).min(10).max(10);
const password = Joi.string().regex(new RegExp('^[a-zA-ZÀ-ÿ \\u00f1 \\u00d1 \\s 0-9]+$')).min(8).max(30);

export const modifyMatchFromUserParamsDto = Joi.object({
  userId: document
    .required(),
  id: id
    .required()
})

export const modifyMatchFromUserBodyDto = Joi.object({
  local_score: result
    .required(),
  visitor_score: result
    .required()
})

export const registerDto = Joi.object({
  document: document,
  names: names,
  surnames: surnames,
  password: password,
  cellphone: cellphone
})

export const userUpdateBodyDto = Joi.object({
  password: password,
  champion: id,
  runner_up: id,
  third_place: id
})

export const userUpdateParamsDto = Joi.object({
  id: document
    .required()
})

export const resetUserPasswordDto = Joi.object({
  document: document
    .required(),
  newPassword: password
    .required()
})