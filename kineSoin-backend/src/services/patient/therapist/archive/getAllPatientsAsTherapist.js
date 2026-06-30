/**
 * @description Retrieves all patients in the system for the authenticated therapist,
 *              returning a normalized, ordered list enriched with therapist metadata
 *              when applicable.
 *
 * Rationale:
 * - Ensures only verified therapists can access the full patient list, maintaining
 *   proper access boundaries and protecting sensitive medical data.
 * - Keeps the controller focused on validation, structured relational querying,
 *   and predictable response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates the therapist ID before performing any read operation.
 * - Returns patients ordered by status, therapist assignment, and name for clearer
 *   administrative viewing.
 * - Normalizes each patient entry with `fullName`, profile picture, and a nested
 *   therapist object when the patient is assigned.
 * - Provides clear, consistent HTTP status codes for empty results and unexpected errors.
 */

import { Patient, Therapist } from '../../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getAllPatientsAsTherapist(req, res) {
  const therapist_id = getValidId(req.therapist_id, 'Therapist ID');

  await findOrThrow(Therapist, therapist_id, 'Therapist');

  try {
    const foundPatients = await Patient.findAll({
      order: [
        ['status', 'ASC'],
        ['therapist_id', 'ASC'],
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

    if (!foundPatients || foundPatients.length === 0) {
      return res.status(400).json({ message: 'No patients found' });
    } else {
      const sentPatients = foundPatients.map((patient) => ({
        id: patient.id,
        status: patient.status,
        fullName: `${patient.name} ${patient.surname}`,
        picture_url: patient.picture_url,
        therapist: patient.therapist
          ? {
              id: patient.therapist.id,
              fullName: `${patient.therapist.name || ''} ${patient.therapist.surname || ''}`,
              picture_url: patient.therapist.picture_url || null,
            }
          : null,
      }));

      return res.status(200).json(sentPatients);
    }
  } catch (error) {
    console.error('Error fetching patients:', error);

    return res.status(500).json({
      message: 'Error fetching patients:',
      error: error.message,
    });
  }
}
