import Joi from 'joi';

const createdAfflictionSchema = Joi.object({
  body_region_id: Joi.number().integer().required(),
  name: Joi.string().max(50).required(),
  description: Joi.string().required(),
  insurance_code: Joi.string().max(255).required(),
  is_operated: Joi.boolean().required(),
});

export default createdAfflictionSchema;
