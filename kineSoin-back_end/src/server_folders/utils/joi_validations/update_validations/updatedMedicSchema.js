import Joi from 'joi';

const updatedMedicSchema = Joi.object({
  admin_id: Joi.number().required(),
  name: Joi.string().optional(),
  surname: Joi.string().optional(),
  street_number: Joi.string().optional(),
  street_name: Joi.string().optional(),
  postal_code: Joi.string().optional(),
  city: Joi.string().optional(),
  phone_number: Joi.string().optional(),
  licence_code: Joi.string().optional(),
  prefix: Joi.string().optional(),
  full_phone_number: Joi.string().optional(),
  email: Joi.string().email().optional(),
}).min(1);

export default updatedMedicSchema;
