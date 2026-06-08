/**
 * @function getAllPatientsAsTherapist
 * @description
 * Retrieves all patients associated with the system for a therapist-facing view,
 * including linked therapist information.
 *
 * This controller:
 * - Validates the therapist ID using `getValidId`.
 * - Fetches all patients from the database using `Patient.findAll`.
 * - Orders patients by status, therapist ID, and name.
 * - Includes associated therapist data for each patient.
 * - Formats and normalizes the response for frontend consumption.
 *
 * Behavior:
 * - Ensures only authenticated therapists can access the data.
 * - Retrieves a structured list of patients with essential display fields.
 * - Groups and sorts patients for easier UI rendering.
 * - Maps relational data (therapist) into a simplified nested structure.
 *
 * Error handling:
 * - Returns 400 if therapist ID is missing or invalid.
 * - Returns 400 if no patients are found.
 * - Returns 500 if a database or unexpected server error occurs.
 *
 * @param {Object} req - Express request object.
 *   - `req.therapist_id` {number} Therapist ID injected by authentication middleware.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response containing:
 *   - 200: Array of patients with formatted details.
 *   - 400: Invalid therapist ID or no patients found.
 *   - 500: Internal server error.
 *
 * Response payload:
 * - `id` {number} Patient ID.
 * - `status` {string} Patient status.
 * - `fullName` {string} Patient full name.
 * - `therapist` {Object|null} Associated therapist information.
 *   - `id` {number} Therapist ID.
 *   - `fullName` {string} Therapist full name.
 *   - `picture_url` {string|null} Therapist profile picture.
 *
 * @sideEffects
 * - None (read-only database query).
 */

import { getValidId } from '../../../middlewares/getValidId.js';
import { Patient } from '../../../models/index.js';

export default async function getAllPatientsAsTherapist(req, res) {
  const therapist_id = getValidId(req.therapist_id, 'Therapist ID');

  if (!therapist_id) {
    return res.status(400).json({ message: 'Therapist not found' });
  } else {
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
      console.error('Error retrieving patients:', error.message);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
