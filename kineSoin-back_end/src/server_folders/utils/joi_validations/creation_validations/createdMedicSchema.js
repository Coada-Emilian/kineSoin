import Joi from 'joi';

const createdMedicSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  street_number: Joi.string().optional(),
  street_name: Joi.string().required(),
  postal_code: Joi.string().required(),
  city: Joi.string().required(),
  phone_number: Joi.string().required(),
  licence_code: Joi.string().required(),
  prefix: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

export default createdMedicSchema;
