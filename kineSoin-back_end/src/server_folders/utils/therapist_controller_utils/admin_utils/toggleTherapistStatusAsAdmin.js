/**
 * @function toggleTherapistStatusAsAdmin
 * @description
 * Handles toggling the status of a therapist between "active" and "inactive"
 * from the admin panel.
 *
 * This controller:
 * - Validates the admin ID using `getValidId`.
 * - Extracts and validates the therapist ID from request parameters.
 * - Retrieves the therapist from the database.
 * - Toggles the therapist status based on its current value.
 * - Saves the updated therapist entity.
 *
 * Behavior:
 * - If therapist status is "active", it becomes "inactive".
 * - If therapist status is "inactive" (or any other value), it becomes "active".
 * - Ensures the therapist exists before applying changes.
 *
 * Error handling:
 * - Returns 400 if admin ID or therapist ID is invalid.
 * - Returns 400 if therapist is not found.
 * - Returns 500 for unexpected server/database errors.
 *
 * @param {Object} req - Express request object.
 *   - `req.admin_id` {number} Admin ID injected by authentication middleware.
 *   - `req.params.therapist_id` {string|number} Therapist ID to toggle status.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response confirming status toggle or describing errors.
 *
 * @sideEffects
 * - Updates therapist status in the database.
 */

import { getValidId } from '../../../middlewares/getValidId.js';
import { Therapist } from '../../../models/index.js';

export default async function toggleTherapistStatusAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin not found' });
  } else {
    try {
      const therapist_id = getValidId(req.params.therapist_id, 'Therapist ID');

      const foundTherapist = await Therapist.findByPk(therapist_id);

      if (!foundTherapist) {
        return res.status(400).json({ message: 'Therapist not found' });
      }

      if (foundTherapist.status === 'active') {
        foundTherapist.status = 'inactive';
      } else {
        foundTherapist.status = 'active';
      }

      await foundTherapist.save();

      return res
        .status(200)
        .json({ message: 'Therapist status updated successfully!' });
    } catch (error) {
      console.error('Error toggling therapist status:', error);
    }
  }
}
