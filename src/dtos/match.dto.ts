import Joi from 'joi';

const result = Joi.number();

export const modifyMatchDto = Joi.object({
  local_score: result
    .required(),
  visitor_score: result
    .required()
})