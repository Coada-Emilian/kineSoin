import Joi from 'joi';
import { Patient } from '../../../models/index.js';
import { checkIsValidNumber } from '../../checkIsValidNumber.js';

export default async function changePatientStatusAsAdmin(req, res) {
  const admin_id = parseInt(req.admin_id, 10);

  checkIsValidNumber(admin_id);

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin not found' });
  } else {
    try {
      const patient_id = parseInt(req.params.patient_id, 10);

      checkIsValidNumber(patient_id);

      const updatedPatientStatusSchema = Joi.object({
        status: Joi.string().valid('active', 'pending', 'banned', 'inactive'),
      });

      if (!req.body) {
        return res.status(400).json({
          message:
            'Request body is missing. Please provide the necessary data.',
        });
      } else {
        const { error } = updatedPatientStatusSchema.validate(req.body);

        if (error) {
          return res.status(400).json({ message: error.message });
        } else {
          const { status } = req.body;

          const foundPatient = await Patient.findByPk(patient_id);

          if (!foundPatient) {
            return res.status(400).json({ message: 'Patient not found' });
          } else {
            await foundPatient.update({ status });

            return res.status(200).json({
              message: 'Patient status updated successfully!',
            });
          }
        }
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
