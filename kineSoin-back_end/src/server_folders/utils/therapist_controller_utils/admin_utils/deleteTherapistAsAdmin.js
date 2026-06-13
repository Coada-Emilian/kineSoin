/**
 * @function deleteTherapistAsAdmin
 * @description
 * Handles the deletion of a therapist from the admin panel.
 *
 * This controller:
 * - Validates the admin ID using `getValidId`.
 * - Extracts and validates the therapist ID from request parameters.
 * - Attempts to delete the therapist record from the database.
 * - Checks whether a record was actually deleted.
 *
 * Behavior:
 * - If the therapist exists, it is permanently removed from the database.
 * - If no therapist is found, an error response is returned.
 *
 * Error handling:

 * - Returns 400 if the therapist does not exist.
 * - Logs and handles unexpected server/database errors.
 *
 * @param {Object} req - Express request object.
 *   - `req.admin_id` {number} Admin ID injected by authentication middleware.
 *   - `req.params.therapist_id` {string|number} Therapist ID to delete.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response confirming deletion or describing the error.
 *
 * @sideEffects
 * - Permanently removes a therapist record from the database.
 */

import { findOrThrow } from '../../../middlewares/findOrThrow.js';
import { getValidId } from '../../../middlewares/getValidId.js';
import { Admin, Therapist } from '../../../models/index.js';

export default async function deleteTherapistAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  try {
    const therapist_id = getValidId(req.params.therapist_id, 'Therapist ID');

    const response = await Therapist.destroy({
      where: { id: therapist_id },
    });

    if (!response) {
      return res.status(400).json({ message: 'Therapist not found' });
    } else {
      return res
        .status(200)
        .json({ message: 'Therapist deleted successfully!' });
    }
  } catch (error) {
    console.error('Error deleting therapist:', error);

    return res.status(500).json({
      message: 'Error deleting therapist:',
      error: error.message,
    });
  }
}
