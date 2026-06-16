import Joi from 'joi';

const registeredPatientSchema = Joi.object({
  therapist_id: Joi.number().optional(),
  name: Joi.string().max(50).required(),
  birth_name: Joi.string().max(50),
  surname: Joi.string().max(50).required(),
  birth_date: Joi.date().required(),
  gender: Joi.string().max(10).required(),
  street_number: Joi.string().max(10),
  street_name: Joi.string().max(50).required(),
  postal_code: Joi.string().max(10).required(),
  city: Joi.string().max(100).required(),
  prefix: Joi.string().max(10).required(),
  phone_number: Joi.string().max(15).required(),
  full_phone_number: Joi.string().max(25).optional(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(12).max(255).required(),
  repeated_password: Joi.string().min(12).max(255).required(),
});

export default registeredPatientSchema;
