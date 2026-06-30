/**
 * @description Retrieves the authenticated patient’s assigned therapist, enforcing
 *              patient‑status rules and returning a sanitized therapist profile
 *              when available.
 *
 * Rationale:
 * - Ensures patients can securely access information about their personal therapist,
 *   supporting continuity of care while maintaining strict access boundaries.
 * - Keeps the controller focused on validation, relational querying, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates the patient ID before performing any read operation.
 * - Enforces patient‑status rules to block access for restricted accounts.
 * - Returns `therapist: null` when the patient has no assigned therapist.
 * - Provides essential therapist metadata (identity, qualifications, profile image)
 *   without exposing sensitive fields.
 * - Returns consistent HTTP status codes for missing records, successful retrieval,
 *   and unexpected server errors.
 */

import { Patient } from '../../../../models/index.js';

export default async function getPersonalTherapistAsPatient(req, res) {
  const patient_id = parseInt(req.patient_id, 10);

  if (!patient_id) {
    return res.status(400).json({ message: 'Patient not found' });
  } else {
    try {
      const foundPatient = await Patient.findByPk(patient_id, {
        attributes: ['id', 'name', 'surname', 'status'],
        include: [
          {
            association: 'therapist',
            attributes: [
              'id',
              'name',
              'surname',
              'description',
              'diploma',
              'experience',
              'specialty',
              'picture_url',
            ],
          },
        ],
      });

      if (!foundPatient) {
        return res.status(400).json({ message: 'Patient not found' });
      } else {
        checkPatientStatus(foundPatient);

        if (!foundPatient.therapist) {
          return res.status(200).json({
            message: "This patient doesn't have a therapist",
            therapist: null,
          });
        } else {
          const therapist = foundPatient.therapist;

          res.status(200).json({
            therapist,
          });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
