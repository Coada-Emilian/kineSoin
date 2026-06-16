import Joi from 'joi';

const updatedPatientByTherapistSchema = Joi.object({
  status: Joi.string().optional(),
  therapist_id: Joi.string().optional(),
}).min(1);

export default updatedPatientByTherapistSchema;
