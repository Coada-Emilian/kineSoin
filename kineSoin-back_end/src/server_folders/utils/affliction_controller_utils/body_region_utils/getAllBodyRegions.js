/**
 * @description Retrieves all body regions for administrative purposes.
 *
 * This controller method is responsible for:
 *
 * - `getAllBodyRegions(req, res)`:
 *   - Parses and validates the `admin_id` from the request.
 *   - Queries the database for all body regions.
 *   - Selects only `id` and `name` attributes.
 *   - Sorts results alphabetically by name.
 *   - Returns:
 *     - `400` if `admin_id` is missing or invalid.
 *     - `404` if no body regions are found.
 *     - `200` with a list of body regions if found.
 *     - `500` for any internal server error.
 *
 * All logic ensures:
 * - Admin ID is validated using `checkIsValidNumber`.
 * - Consistent and meaningful HTTP status codes are returned.
 * - Errors are logged to the console for server-side debugging.
 *
 * @module getAllBodyRegions
 * @requires Body_region - Sequelize model representing the `body_regions` table.
 * @requires checkIsValidNumber - Utility function for validating numeric inputs.
 */

import { Body_region } from '../../../models/associations.js';
import { checkIsValidNumber } from '../../checkIsValidNumber.js';

export default async function getAllBodyRegions(req, res) {
  const admin_id = parseInt(req.admin_id, 10);

  checkIsValidNumber(admin_id);

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin ID is required.' });
  } else {
    try {
      const foundBodyRegions = await Body_region.findAll({
        attributes: ['id', 'name'],
        order: [['name', 'ASC']],
      });

      if (!foundBodyRegions) {
        return res.status(404).json({ message: 'No body regions found.' });
      } else {
        return res.status(200).json(foundBodyRegions);
      }
    } catch (error) {
      console.error('Error fetching body regions:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
