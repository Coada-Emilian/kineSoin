/**
 * @function getAllInsuranceOrganismsAsAdmin
 * @description
 * Retrieves a list of all insurance organisms in the database. This action is reserved for admin users.
 *
 * Steps:
 * 1. Parses and validates `admin_id` from the request context.
 * 2. If valid, fetches all insurances using Sequelize’s `findAll()` method.
 * 3. Returns only selected attributes: `id`, `name`, and `amc_code`.
 *
 * Responses:
 * - 200: Returns an array of insurance organisms.
 * - 400: Missing or invalid admin ID, or no insurances found.
 * - 500: Internal server error while retrieving data.
 *
 * @param {Object} req - Express request object, expects `admin_id` from authenticated context.
 * @param {Object} res - Express response object to return data or error messages.
 */

import { Insurance } from '../../../models/index.js';
import { checkIsValidNumber } from '../../checkIsValidNumber.js';

export default async function getAllInsuranceOrganismsAsAdmin(req, res) {
  const admin_id = parseInt(req.admin_id, 10);

  checkIsValidNumber(admin_id);

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin ID is required.' });
  } else {
    try {
      const allInsurances = await Insurance.findAll({
        attributes: ['id', 'name', 'amc_code'],
      });

      if (!allInsurances) {
        return res.status(400).json({ message: 'No insurance found' });
      } else {
        return res.status(200).json(allInsurances);
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching insurances.' });
    }
  }
}
