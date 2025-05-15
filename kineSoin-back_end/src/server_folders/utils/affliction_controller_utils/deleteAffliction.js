/**
 * @description Deletes a specific affliction from the database for administrative use.
 *
 * This controller method handles:
 *
 * - `deleteAffliction(req, res)`:
 *   - Parses and validates the `admin_id` from the request.
 *   - Parses and validates the `affliction_id` from the route parameters.
 *   - Checks if the affliction exists in the database.
 *   - Deletes the affliction if found.
 *   - Returns:
 *     - `400` if `admin_id` is missing or invalid.
 *     - `404` if the specified affliction does not exist.
 *     - `500` if deletion fails due to a server error.
 *     - `200` with a success message if deletion succeeds.
 *
 * Additional safeguards:
 * - Validates numeric inputs using `checkIsValidNumber`.
 * - Logs internal server errors for debugging purposes.
 *
 * @module deleteAffliction
 * @requires Affliction - Sequelize model representing the `afflictions` table.
 * @requires checkIsValidNumber - Utility function to ensure numeric ID inputs are valid.
 */

import { Affliction } from '../../models/associations.js';
import { checkIsValidNumber } from '../checkIsValidNumber.js';

export default async function deleteAffliction(req, res) {
  const admin_id = parseInt(req.admin_id, 10);

  checkIsValidNumber(admin_id);

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin ID is required.' });
  } else {
    try {
      const afflictionId = parseInt(req.params.affliction_id, 10);

      checkIsValidNumber(afflictionId);

      const foundAffliction = await Affliction.findByPk(afflictionId);

      if (!foundAffliction) {
        return res.status(404).json({ message: 'Affliction not found.' });
      } else {
        const deletedAffliction = await foundAffliction.destroy();

        if (!deletedAffliction) {
          return res
            .status(500)
            .json({ message: 'Error while deleting affliction.' });
        } else {
          return res
            .status(200)
            .json({ message: 'Affliction deleted successfully.' });
        }
      }
    } catch (error) {
      console.error('Error deleting affliction:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
