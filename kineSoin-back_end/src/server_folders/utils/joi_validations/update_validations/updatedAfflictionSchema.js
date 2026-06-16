import Joi from 'joi';

const updatedAfflictionSchema = Joi.object({
  admin_id: Joi.number().integer().optional(),
  body_region_id: Joi.number().integer().optional(),
  name: Joi.string().max(50).optional(),
  description: Joi.string().optional(),
  insurance_code: Joi.string().max(255).optional(),
  is_operated: Joi.boolean().optional(),
}).min(1);

export default updatedAfflictionSchema;
