import Joi from 'joi';

const updatedTherapistSchema = Joi.object({
  status: Joi.string().valid('active', 'inactive').optional(),
  id: Joi.number().integer().optional(),
  name: Joi.string().max(50).allow('').optional(),
  surname: Joi.string().max(50).allow('').optional(),
  email: Joi.string().email().max(100).allow('').optional(),
  password: Joi.string().max(100).allow('').optional(),
  diploma: Joi.string().max(50).allow('').optional(),
  experience: Joi.string().max(50).allow('').optional(),
  specialty: Joi.string().max(50).allow('').optional(),
  phone_number: Joi.string().max(15).allow('').optional(),
  description: Joi.string().allow('').optional(),
  licence_code: Joi.string().max(9).allow('').optional(),
  prefix: Joi.string().max(10).allow('').optional(),
}).min(1);

export default updatedTherapistSchema;
