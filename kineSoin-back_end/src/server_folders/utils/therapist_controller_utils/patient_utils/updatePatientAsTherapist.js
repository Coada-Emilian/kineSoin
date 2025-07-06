import Joi from 'joi';
import { Patient } from '../../../models/index.js';
import { checkIsValidNumber } from '../../checkIsValidNumber.js';

export default async function updatePatientAsTherapist(req, res) {
  const therapist_id = parseInt(req.therapist_id, 10);

  if (!therapist_id) {
    return res.status(400).json({ message: 'Therapist not found' });
  } else {
    checkIsValidNumber(therapist_id);
    const patient_id = parseInt(req.params.patient_id, 10);

    if (!patient_id) {
      return res.status(400).json({ message: 'Patient not found' });
    } else {
      checkIsValidNumber(patient_id);

      try {
        const foundPatient = await Patient.findByPk(patient_id);

        if (!foundPatient) {
          return res.status(404).json({ message: 'Patient not found' });
        } else {
          if (!req.body) {
            return res
              .status(400)
              .json({ message: 'No data provided for update' });
          } else {
            const updateBodyValidationSchema = Joi.object({
              status: Joi.string().optional(),
              therapist_id: Joi.string().optional(),
            }).min(1);

            const { error } = updateBodyValidationSchema.validate(req.body);

            if (error) {
              return res.status(400).json({
                message: 'Invalid data provided for update',
                details: error.details,
              });
            } else {
              const updatedPatient = await foundPatient.update({
                status: req.body.status,
                therapist_id: req.body.therapist_id,
              });

              if (!updatedPatient) {
                return res.status(400).json({
                  message: 'Failed to update patient',
                });
              } else {
                return res.status(200).json({
                  message: 'Patient updated successfully',
                  patient: updatedPatient,
                });
              }
            }
          }
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
}
