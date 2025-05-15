/**
 * @description Retrieves all afflictions along with associated body region details.
 *
 * This controller method handles:
 *
 * - `getAllAfflictions(req, res)`:
 *   - Parses and validates the `admin_id` from the request.
 *   - Fetches all afflictions with the following attributes:
 *     - `id`, `name`, `description`, `insurance_code`, `is_operated`, `body_region_id`.
 *   - Includes related `body_region` data with `id` and `name`.
 *   - Orders results first by `body_region_id`, then alphabetically by `name`.
 *   - Returns:
 *     - `400` if `admin_id` is missing or invalid.
 *     - `404` if no afflictions are found.
 *     - `500` if a server error occurs.
 *     - `200` with the list of afflictions and their regions if successful.
 *
 * Additional safeguards:
 * - Validates numeric inputs using `checkIsValidNumber`.
 * - Logs server-side errors for easier debugging.
 *
 * @module getAllAfflictions
 * @requires Affliction - Sequelize model representing the `afflictions` table.
 * @requires checkIsValidNumber - Utility function to validate numeric IDs.
 */

import { Affliction } from '../../models/associations.js';
import { checkIsValidNumber } from '../checkIsValidNumber.js';

export default async function getAllAfflictions(req, res) {
  const admin_id = parseInt(req.admin_id, 10);

  checkIsValidNumber(admin_id);

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin ID is required.' });
  } else {
    try {
      const foundAfflictions = await Affliction.findAll({
        attributes: [
          'id',
          'name',
          'description',
          'insurance_code',
          'is_operated',
          'body_region_id',
        ],
        order: [
          ['body_region_id', 'ASC'],
          ['name', 'ASC'],
        ],
        include: [
          {
            association: 'body_region',
            attributes: ['id', 'name'],
          },
        ],
      });

      if (!foundAfflictions) {
        return res.status(404).json({ message: 'No afflictions found.' });
      } else {
        return res.status(200).json(foundAfflictions);
      }
    } catch (error) {
      console.error('Error fetching afflictions:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
