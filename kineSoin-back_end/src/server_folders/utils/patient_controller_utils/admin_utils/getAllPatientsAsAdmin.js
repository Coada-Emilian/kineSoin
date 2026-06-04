/**
 * @function getAllPatientsAsAdmin
 * @description
 * Retrieves all patients for administrative purposes with enriched and formatted data.
 *
 * This controller:
 * - Validates the admin ID using `getValidId`.
 * - Fetches all patients from the database with selected fields only.
 * - Includes associated therapist data (if assigned).
 * - Orders results by status and name for easier administration viewing.
 * - Computes additional derived fields such as age and full address.
 * - Formats therapist information into a readable string when available.
 *
 * Data transformation includes:
 * - fullName: concatenation of patient name and surname
 * - age: calculated from birth_date using `computeAge`
 * - address: formatted string combining street and location details
 * - therapist: formatted therapist full name or null if not assigned
 *
 * Behavior:
 * - Returns all patients with enriched data for admin display.
 * - Returns 404 if no patients are found.
 *
 * Error handling:
 * - Returns 400 if admin ID is invalid.
 * - Returns 404 if no patients exist in the database.
 * - Returns 500 for unexpected server/database errors.
 *
 * @param {Object} req - Express request object.
 *   - `req.admin_id` {number} Admin ID injected by authentication middleware.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object[]} JSON array of formatted patient objects.
 *
 * @sideEffects
 * - No database mutations; read-only operation.
 */

import { getValidId } from '../../../middlewares/getValidId.js';
import { Patient } from '../../../models/index.js';

export default async function getAllPatientsAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin not found' });
  }

  try {
    const foundPatients = await Patient.findAll({
      attributes: [
        'id',
        'name',
        'surname',
        'status',
        // 'birth_date',
        // 'phone_number',
        // 'city',
        // 'street_name',
        // 'street_number',
        // 'postal_code',
      ],
      order: [
        ['status', 'ASC'],
        ['name', 'ASC'],
      ],
      include: [
        {
          association: 'therapist',
          attributes: ['id', 'name', 'surname'],
        },
      ],
    });

    if (!foundPatients || foundPatients.length === 0) {
      return res.status(404).json({ message: 'No patients found' });
    }

    const sentPatients = foundPatients.map((patient) => ({
      id: patient.id,
      status: patient.status,
      name: patient.name,
      surname: patient.surname,
      fullName: `${patient.name} ${patient.surname}`,
      // age: computeAge(patient.birth_date),
      // address: `${patient.street_number} ${patient.street_name}, ${patient.postal_code} ${patient.city}`,
      // phone_number: patient.phone_number,
      // therapist: patient.therapist
      //   ? `${patient.therapist.name} ${patient.therapist.surname}`
      //   : null,
    }));

    return res.status(200).json(sentPatients);
  } catch (error) {
    console.error('Error getting patients:', error);
    return res
      .status(500)
      .json({ message: `Error getting patients: ${error.message}` });
  }
}
