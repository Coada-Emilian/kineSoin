import Joi from 'joi';

const updatedTherapistStatusSchema = Joi.object({
  status: Joi.string().valid('active', 'inactive'),
});

export default updatedTherapistStatusSchema;
