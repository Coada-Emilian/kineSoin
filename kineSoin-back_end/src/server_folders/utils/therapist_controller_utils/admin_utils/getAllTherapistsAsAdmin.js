/**
 * @function getAllTherapistsAsAdmin
 *
 * @description
 * Handles the retrieval of all therapists for administrative purposes.
 *
 * This controller:
 * - Extracts and validates the admin ID from the request object.
 * - Ensures the admin ID is a valid number using a utility validator.
 * - Fetches all therapists from the database using the Therapist model.
 * - Selects only relevant fields (id, name, surname, status) for security and efficiency.
 * - Orders results by status (ascending) and name (ascending).
 * - Transforms raw database records into a simplified response format.
 * - Returns a list of therapists with a computed fullName field.
 *
 * Response format:
 * - id: therapist identifier
 * - fullName: concatenation of name + surname
 * - status: therapist availability or account status
 *
 * Error handling:
 * - Returns 400 if no therapists are found.
 * - Returns 500 for unexpected server/database errors.
 *
 * @param {Object} req - Express request object. Requires `req.admin_id` to be set by authentication middleware.
 * @param {Object} res - Express response object used to return JSON data or error messages.
 *
 * @returns {Object} JSON response containing an array of therapists or an error message.
 */

import { getValidId } from '../../../middlewares/getValidId.js';
import { Therapist } from '../../../models/index.js';

export default async function getAllTherapistsAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  try {
    const foundTherapists = await Therapist.findAll({
      attributes: ['id', 'name', 'surname', 'status'],
      order: [
        ['status', 'ASC'],
        ['name', 'ASC'],
      ],
    });

    if (foundTherapists.length === 0) {
      return res.status(400).json({ message: 'No therapists found' });
    }

    const allTherapists = [];

    for (const therapist of foundTherapists) {
      const newTherapist = {
        id: therapist.id,
        fullName: `${therapist.name} ${therapist.surname}`,
        status: therapist.status,
      };
      allTherapists.push(newTherapist);
    }

    return res.status(200).json(allTherapists);
  } catch (err) {
    console.error('Error fetching therapists:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
