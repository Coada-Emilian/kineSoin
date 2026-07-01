import Joi from 'joi';

const updatedPatientStatusSchema = Joi.object({
  status: Joi.string().valid('active', 'pending', 'banned', 'inactive'),
});

export default updatedPatientStatusSchema;
