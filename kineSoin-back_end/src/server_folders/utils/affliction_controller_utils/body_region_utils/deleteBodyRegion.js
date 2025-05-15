/**
 * @description Handles the deletion of a body region by an administrator.
 *
 * This controller method is responsible for:
 *
 * - `deleteBodyRegion(req, res)`:
 *   - Parses and validates the `admin_id` from the request.
 *   - Parses and validates the `body_region_id` from the request parameters.
 *   - Checks if the specified body region exists in the database.
 *   - Deletes the body region if it exists.
 *   - Returns:
 *     - `400` if `admin_id` is missing or invalid.
 *     - `404` if the body region does not exist.
 *     - `500` for server or deletion errors.
 *     - `200` with a success message if deletion is successful.
 *
 * All logic ensures:
 * - Admin and body region IDs are validated using `checkIsValidNumber`.
 * - Appropriate error messages and HTTP status codes are returned.
 * - Errors are logged to the console for server-side debugging.
 *
 * @module deleteBodyRegion
 * @requires Body_region - Sequelize model representing the `body_regions` table.
 * @requires checkIsValidNumber - Utility function for validating numeric inputs.
 */

import { Body_region } from '../../../models/associations.js';
import { checkIsValidNumber } from '../../checkIsValidNumber.js';

export default async function deleteBodyRegion(req, res) {
  const admin_id = parseInt(req.admin_id, 10);

  checkIsValidNumber(admin_id);

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin ID is required.' });
  } else {
    try {
      const body_region_id = parseInt(req.params.body_region_id, 10);

      checkIsValidNumber(body_region_id);

      const foundBodyRegion = await Body_region.findByPk(body_region_id);

      if (!foundBodyRegion) {
        return res.status(404).json({ message: 'Body region not found.' });
      } else {
        const deletedBodyRegion = await foundBodyRegion.destroy();

        if (!deletedBodyRegion) {
          return res
            .status(500)
            .json({ message: 'Error while deleting body region.' });
        } else {
          return res
            .status(200)
            .json({ message: 'Body region deleted successfully.' });
        }
      }
    } catch (error) {
      console.error('Error deleting body region:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
