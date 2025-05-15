/**
 * @description Fetches detailed information about a specific affliction.
 *
 * This controller method handles:
 *
 * - `getOneAffliction(req, res)`:
 *   - Parses and validates `admin_id` from the request context.
 *   - Parses and validates `affliction_id` from request parameters.
 *   - Retrieves a single affliction by its ID.
 *   - Includes associated `body_region` data with `id` and `name`.
 *   - Selects the following affliction attributes:
 *     - `id`, `name`, `description`, `insurance_code`, `is_operated`.
 *   - Returns:
 *     - `400` if `admin_id` or `affliction_id` is missing or invalid.
 *     - `404` if the affliction is not found.
 *     - `500` if a server error occurs.
 *     - `200` with affliction details if found successfully.
 *
 * Additional safeguards:
 * - Uses `checkIsValidNumber` to validate numeric IDs.
 * - Logs internal errors for debugging.
 *
 * @module getOneAffliction
 * @requires Affliction - Sequelize model representing the `afflictions` table.
 * @requires checkIsValidNumber - Utility function to validate numeric IDs.
 */

import { Affliction } from '../../models/associations.js';
import { checkIsValidNumber } from '../checkIsValidNumber.js';

export default async function getOneAffliction(req, res) {
  const admin_id = parseInt(req.admin_id, 10);

  checkIsValidNumber(admin_id);

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin ID is required.' });
  } else {
    try {
      const affliction_id = parseInt(req.params.affliction_id, 10);

      checkIsValidNumber(affliction_id);

      if (!affliction_id) {
        return res.status(400).json({ message: 'Affliction ID is required.' });
      }

      const foundAffliction = await Affliction.findByPk(affliction_id, {
        attributes: [
          'id',
          'name',
          'description',
          'insurance_code',
          'is_operated',
        ],
        include: [
          {
            association: 'body_region',
            attributes: ['id', 'name'],
          },
        ],
      });

      if (!foundAffliction) {
        return res.status(404).json({ message: 'Affliction not found.' });
      } else {
        return res.status(200).json(foundAffliction);
      }
    } catch (error) {
      console.error('Error fetching affliction:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
