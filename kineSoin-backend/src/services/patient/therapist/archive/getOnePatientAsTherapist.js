/**
 * @description Retrieves a detailed profile of a specific patient for the
 *              authenticated therapist, enriching the response with insurance
 *              details and computed age while excluding sensitive fields.
 *
 * Rationale:
 * - Ensures only verified therapists can access full patient records, protecting
 *   privacy and maintaining proper access boundaries.
 * - Keeps the controller focused on validation, structured relational querying,
 *   and predictable response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates therapist and patient IDs before performing any read operation.
 * - Excludes sensitive fields (passwords, metadata) and enriches the payload with
 *   derived values such as `age` and insurance details.
 * - Includes therapist metadata to confirm assignment and provide contextual clarity.
 * - Returns clear, consistent HTTP status codes for missing records, missing insurance,
 *   and unexpected server errors.
 */

import {
  Patient,
  Patient_Insurance,
  Therapist,
} from '../../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';
import computeAge from '../../computeAge.js';

export default async function getOnePatientAsTherapist(req, res) {
  const therapist_id = getValidId(req.therapist_id, 'Therapist ID');

  await findOrThrow(Therapist, therapist_id, 'Therapist');

  try {
    const patient_id = getValidId(req.params.patient_id, 'Patient ID');

    const foundPatient = await Patient.findByPk(patient_id, {
      attributes: {
        exclude: [
          'password',
          'old_password',
          'new_password',
          'repeated_password',
          'created_at',
          'updated_at',
          'picture_id',
          'birth_name',
          'full_phone_number',
          'gender',
        ],
      },
      include: [
        {
          association: 'therapist',
          attributes: ['id', 'name', 'surname'],
        },
      ],
    });

    const foundPatientInsurance = await Patient_Insurance.findOne({
      where: { patient_id },
      attributes: [
        'id',
        'adherent_code',
        'contract_number',
        'start_date',
        'end_date',
      ],
      include: [
        {
          association: 'insurance',
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!foundPatientInsurance) {
      return res.status(404).json({ message: 'Patient insurance not found' });
    } else {
      foundPatient.dataValues.insurance_details = foundPatientInsurance;
    }

    if (!foundPatient) {
      return res.status(400).json({ message: 'Patient not found' });
    } else {
      const age = computeAge(foundPatient.birth_date);

      foundPatient.dataValues.age = age;

      return res.status(200).json(foundPatient);
    }
  } catch (error) {
    console.error('Error fetching patient:', error);

    return res.status(500).json({
      message: 'Error fetching patient:',
      error: error.message,
    });
  }
}
