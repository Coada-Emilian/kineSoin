/**
 * @description Retrieves all patients assigned to the authenticated therapist,
 *              returning a normalized, ordered list enriched with therapist
 *              metadata for frontend display.
 *
 * Rationale:
 * - Ensures only verified therapists can access their appointed patients,
 *   protecting privacy and maintaining proper access boundaries.
 * - Keeps the controller focused on validation, structured relational querying,
 *   and predictable response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates the therapist ID before performing any read operation.
 * - Returns patients ordered by status and name for clearer administrative viewing.
 * - Normalizes each patient entry with `fullName`, profile picture, and a nested
 *   therapist object containing formatted identity metadata.
 * - Provides clear, consistent HTTP status codes for empty results and unexpected errors.
 */

import { Patient, Therapist } from '../../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';

export default async function getAllAppointedPatientsAsTherapist(req, res) {
  const therapist_id = parseInt(req.therapist_id, 10);

  await findOrThrow(Therapist, therapist_id, 'Therapist');

  try {
    const foundPatients = await Patient.findAll({
      where: { therapist_id },
      order: [
        ['status', 'ASC'],
        ['name', 'ASC'],
      ],
      attributes: ['id', 'name', 'surname', 'status', 'picture_url'],
      include: [
        {
          association: 'therapist',
          attributes: ['id', 'name', 'surname', 'picture_url'],
        },
      ],
    });

    if (foundPatients.length === 0) {
      return res.status(400).json({ message: 'No patients found' });
    } else {
      const sentPatients = [];

      for (const patient of foundPatients) {
        const newPatient = {
          id: patient.id,
          status: patient.status,
          fullName: `${patient.name} ${patient.surname}`,
          picture_url: patient.picture_url,
          therapist: {
            id: patient.therapist.id,
            fullName: `${patient.therapist.name} ${patient.therapist.surname}`,
            picture_url: patient.therapist.picture_url,
          },
        };

        sentPatients.push(newPatient);
      }

      console.log('getAllAppointedPatientsAsTherapist fired');
      return res.status(200).json(sentPatients);
    }
  } catch (error) {
    console.error('Error fetching appointments:', error);

    return res.status(500).json({
      message: 'Error fetching appointments:',
      error: error.message,
    });
  }
}
