/**
 * @description Retrieves all active (non‑completed) prescriptions for the
 *              authenticated patient, including associated medic and affliction
 *              details, while enforcing patient‑status rules.
 *
 * Rationale:
 * - Ensures only verified and active patients can access their medical records,
 *   protecting privacy and maintaining secure access boundaries.
 * - Keeps the controller focused on validation, relational querying, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates the patient ID and confirms the patient exists before performing any read.
 * - Enforces patient‑status rules to block access for inactive or restricted accounts.
 * - Returns only non‑completed prescriptions, enriched with medic and affliction
 *   metadata for clearer medical context.
 * - Provides consistent HTTP status codes for missing records, empty prescription lists,
 *   and unexpected server errors.
 */

import { Patient } from '../../../../models/index.js';
import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { checkPatientStatus } from '../../checkPatientStatus.js';

export default async function getAllPrescriptionsAsPatient(req, res) {
  const patient_id = parseInt(req.patient_id, 10);

  checkIsValidNumber(patient_id);

  if (!patient_id) {
    return res.status(400).json({ message: 'Patient not found' });
  } else {
    try {
      const foundPatient = await Patient.findByPk(patient_id, {
        attributes: ['id', 'name', 'surname', 'status'],
        include: [
          {
            association: 'prescriptions',
            required: false,
            where: { is_completed: false },
            attributes: [
              'id',
              'date',
              'appointment_quantity',
              'at_home_care',
              'picture_url',
            ],
            include: [
              {
                association: 'medic',
                attributes: ['id', 'name', 'surname', 'licence_code'],
              },
              {
                association: 'affliction',
                attributes: [
                  'id',
                  'name',
                  'insurance_code',
                  'description',
                  'insurance_code',
                ],
              },
            ],
          },
        ],
      });

      checkPatientStatus(foundPatient);

      if (foundPatient.prescriptions.length === 0) {
        return res.status(200).json({ prescriptions: [] });
      } else {
        res.status(200).json(foundPatient.prescriptions);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
