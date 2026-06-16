import Joi from 'joi';

const createdTherapistSchema = Joi.object({
  name: Joi.string().max(50).required(),
  surname: Joi.string().max(50).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(12).max(255).required(),
  repeated_password: Joi.string().valid(Joi.ref('password')).required(),
  description: Joi.string().max(50).required(),
  diploma: Joi.string().max(50).required(),
  experience: Joi.string().max(50).required(),
  specialty: Joi.string().max(50).required(),
  prefix: Joi.string().max(10).required(),
  phone_number: Joi.string().max(15).required(),
  full_phone_number: Joi.string().max(15).optional(),
  licence_code: Joi.string().max(25).required(),
  status: Joi.string().valid('active', 'inactive').optional(),
});

export default createdTherapistSchema;
