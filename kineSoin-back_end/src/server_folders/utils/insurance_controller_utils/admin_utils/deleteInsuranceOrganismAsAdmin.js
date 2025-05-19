/**
 * @function deleteInsuranceOrganismAsAdmin
 * @description
 * Deletes an existing insurance organism entry from the system, initiated by an admin.
 *
 * Steps:
 * 1. Parses and validates `admin_id` from the request.
 * 2. Parses and validates `insurance_id` from request parameters.
 * 3. Checks if the insurance organism exists via `Insurance.findByPk`.
 * 4. If found, deletes it using Sequelize's `destroy()` method.
 *
 * Responses:
 * - 200: Insurance organism successfully deleted.
 * - 400: Missing or invalid admin ID or insurance ID, or insurance not found.
 * - 500: Internal server error during the deletion process.
 *
 * @param {Object} req - Express request object, expects `admin_id` in auth context and `insurance_id` in route params.
 * @param {Object} res - Express response object used to send the result of the deletion operation.
 */

import { Insurance } from '../../../models/index.js';
import { checkIsValidNumber } from '../../checkIsValidNumber.js';

export default async function deleteInsuranceOrganismAsAdmin(req, res) {
  const admin_id = parseInt(req.admin_id, 10);

  checkIsValidNumber(admin_id);

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin ID is required.' });
  } else {
    try {
      const insurance_id = parseInt(req.params.insurance_id, 10);

      checkIsValidNumber(insurance_id);

      const foundInsurance = await Insurance.findByPk(insurance_id);

      if (!foundInsurance) {
        return res.status(400).json({ message: 'Insurance not found' });
      } else {
        const response = await foundInsurance.destroy();

        if (response) {
          return res
            .status(200)
            .json({ message: 'The insurance was deleted', response });
        } else {
          return res
            .status(400)
            .json({ message: 'The insurance was not deleted', response });
        }
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting insurance.' });
    }
  }
}
