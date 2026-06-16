import Joi from 'joi';
import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { Patient, Prescription } from '../../../models/index.js';
import { checkPatientStatus } from '../../checkPatientStatus.js';

export default async function addNewPrescription(req, res) {
  const patient_id = parseInt(req.patient_id, 10);

  checkIsValidNumber(patient_id);

  if (!patient_id) {
    return res.status(400).json({ message: 'Patient not found' });
  } else {
    try {
      const foundPatient = await Patient.findByPk(patient_id);

      checkPatientStatus(foundPatient);

      if (!req.body) {
        return res
          .status(400)
          .json({ message: 'Please provide the prescription details' });
      } else {
        const appointmentQuantity = parseInt(req.body.appointment_quantity, 10);

        if (isNaN(appointmentQuantity)) {
          req.body.appointment_quantity = null;
        }

        const prescriptionSchema = Joi.object({
          medic_id: Joi.number().integer().required(),
          affliction_id: Joi.number().integer().required(),
          appointment_quantity: Joi.number().integer().optional().allow(null),
          at_home_care: Joi.boolean().required(),
          date: Joi.date().required(),
        });

        const { error } = prescriptionSchema.validate(req.body);

        if (error) {
          return res.status(400).json({ message: error.message });
        } else {
          const {
            medic_id,
            affliction_id,
            appointment_quantity,
            at_home_care,
            date,
          } = req.body;

          if (!req.file) {
            return res
              .status(400)
              .json({ message: 'Please upload a prescription scan' });
          }

          const { path, filename } = req.file;

          const picture_url = path;
          const picture_id = filename;

          const uploadedPrescription = await Prescription.create({
            medic_id,
            patient_id: patientId,
            affliction_id,
            appointment_quantity,
            is_new_prescription: true,
            is_completed: false,
            at_home_care,
            date,
            picture_url,
            picture_id,
          });

          res.status(201).json({
            message: 'Prescription added successfully!',
            uploadedPrescription,
          });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
