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
 * - Returns 400 if admin ID or therapist ID is invalid.
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

import { getValidId } from '../../../middlewares/getValidId.js';
import { Therapist } from '../../../models/index.js';

export default async function deleteTherapistAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin not found' });
  } else {
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
    } catch (err) {
      console.error('Error deleting therapist:', err);
    }
  }
}
