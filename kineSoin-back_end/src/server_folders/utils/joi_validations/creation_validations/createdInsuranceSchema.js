import Joi from 'joi';

const createdInsuranceSchema = Joi.object({
  name: Joi.string().required(),
  amc_code: Joi.string().required(),
  street_number: Joi.string().required(),
  street_name: Joi.string().required(),
  postal_code: Joi.string().required(),
  city: Joi.string().required(),
  phone_number: Joi.string().required(),
  prefix: Joi.string().required(),
});

export default createdInsuranceSchema;
