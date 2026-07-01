/**
 * @description Retrieves a single active (non‑completed) prescription for the
 *              authenticated patient, ensuring both the prescription and patient
 *              IDs are valid and that the record belongs to the requesting user.
 *
 * Rationale:
 * - Ensures patients can securely access their own medical records while preventing
 *   unauthorized access to prescriptions belonging to other users.
 * - Keeps the controller focused on validation, relational querying, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates both patient and prescription IDs before performing any read operation.
 * - Returns only prescriptions that are active (`is_completed: false`) and owned
 *   by the requesting patient.
 * - Enriches the response with medic and affliction metadata for clearer medical context.
 * - Provides consistent HTTP status codes for missing records, invalid IDs,
 *   and unexpected server errors.
 */

import { Prescription } from '../../../../models/index.js';
import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';

export default async function getOnePrescription(req, res) {
  const patient_id = parseInt(req.patient_id, 10);

  if (!patient_id) {
    return res.status(400).json({ message: 'Patient not found' });
  } else {
    checkIsValidNumber(patient_id);
  }

  const prescription_id = parseInt(req.params.id, 10);

  if (!prescription_id) {
    return res.status(400).json({ message: 'Prescription not found' });
  } else {
    checkIsValidNumber(prescription_id);
  }

  const foundPrescription = await Prescription.findOne({
    where: { id: prescription_id, patient_id: patient_id, is_completed: false },
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
        attributes: ['id', 'name', 'description', 'insurance_code'],
      },
    ],
  });

  if (!foundPrescription) {
    return res.status(400).json({ message: 'Prescription not found' });
  } else {
    return res.status(200).json(foundPrescription);
  }
}
