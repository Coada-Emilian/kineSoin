import Joi from 'joi';

const updatedInsuranceSchema = Joi.object({
  admin_id: Joi.number().optional(),
  name: Joi.string().optional(),
  amc_code: Joi.string().optional(),
  street_number: Joi.string().optional(),
  street_name: Joi.string().optional(),
  postal_code: Joi.string().optional(),
  city: Joi.string().optional(),
  phone_number: Joi.string().optional(),
  prefix: Joi.string().optional(),
  full_phone_number: Joi.string().optional(),
}).min(1);

export default updatedInsuranceSchema;
