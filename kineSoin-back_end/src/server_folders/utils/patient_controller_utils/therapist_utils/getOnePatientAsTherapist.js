/**
 * @function getOnePatientAsTherapist
 * @description
 * Retrieves detailed information about a single patient for the therapist panel,
 * including therapist relation, insurance details, and computed age.
 *
 * This controller:
 * - Validates the therapist ID using `getValidId`.
 * - Validates the patient ID from request parameters.
 * - Fetches patient data excluding sensitive fields (passwords, internal metadata).
 * - Includes associated therapist information.
 * - Retrieves patient insurance details from `Patient_Insurance`.
 * - Attaches insurance information to the patient response.
 * - Computes and appends patient age using `computeAge`.
 *
 * Behavior:
 * - Ensures only authenticated therapists can access patient details.
 * - Provides a sanitized patient object without sensitive fields.
 * - Enriches response with insurance and computed age data.
 *
 * Data enrichment:
 * - `insurance_details`: linked insurance contract information.
 * - `age`: computed from `birth_date`.
 *
 * Error handling:
 * - Returns 400 if therapist ID is missing or invalid.
 * - Returns 400 if patient is not found.
 * - Returns 404 if patient insurance is not found.
 * - Returns 500 if a database or unexpected server error occurs.
 *
 * @param {Object} req - Express request object.
 *   - `req.therapist_id` {number} Therapist ID injected by authentication middleware.
 *   - `req.params.patient_id` {string|number} Patient ID to retrieve.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response containing:
 *   - 200: Detailed patient object with insurance and age.
 *   - 400: Patient not found or invalid therapist ID.
 *   - 404: Patient insurance not found.
 *   - 500: Internal server error.
 *
 * Response payload:
 * - Patient object excluding sensitive fields.
 * - `insurance_details` {Object} Patient insurance information.
 * - `age` {number} Computed patient age.
 *
 * @sideEffects
 * - None (read-only database queries).
 */

import { findOrThrow } from '../../../middlewares/findOrThrow.js';
import { getValidId } from '../../../middlewares/getValidId.js';
import {
  Patient,
  Patient_Insurance,
  Therapist,
} from '../../../models/index.js';
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
