/**
 * @function deleteMedicAsAdmin
 * @description
 * Deletes an existing medic record through the admin panel.
 *
 * This controller:
 * - Validates the admin ID using `getValidId`.
 * - Validates the medic ID from request parameters.
 * - Retrieves the medic from the database.
 * - Deletes the medic record if it exists.
 *
 * Behavior:
 * - Ensures the requesting admin has a valid ID.
 * - Verifies that the medic exists before attempting deletion.
 * - Permanently removes the medic record from the database.
 *
 * Error handling:
 * - Returns 400 if the admin ID is invalid or missing.
 * - Returns 404 if the medic is not found.
 * - Returns 500 if the deletion fails or an unexpected server/database error occurs.
 *
 * @param {Object} req - Express request object.
 *   - `req.admin_id` {number} Admin ID injected by authentication middleware.
 *   - `req.params.medic_id` {string|number} Medic ID to delete.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response containing a success or error message.
 *
 * @sideEffects
 * - Permanently deletes an existing medic record from the database.
 */

import { getValidId } from '../../../middlewares/getValidId.js';
import { Medic } from '../../../models/index.js';

export default async function deleteMedicAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin ID is required.' });
  } else {
    try {
      const medic_id = getValidId(req.params.medic_id, 'Medic ID');

      const foundMedic = await Medic.findByPk(medic_id);

      if (!foundMedic) {
        return res.status(404).json({ message: 'Medic not found.' });
      } else {
        const deletedMedic = await foundMedic.destroy();

        if (!deletedMedic) {
          return res
            .status(500)
            .json({ message: 'Error while deleting medic.' });
        } else {
          return res
            .status(200)
            .json({ message: 'Medic deleted successfully.' });
        }
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting medic.' });
    }
  }
}
