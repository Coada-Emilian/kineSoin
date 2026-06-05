/**
 * @function getOneInsuranceOrganismAsAdmin
 * @description
 * Retrieves a single insurance organism (insurance provider) by ID through the admin panel.
 *
 * This controller:
 * - Validates the admin ID using `getValidId`.
 * - Validates the insurance ID from request parameters.
 * - Fetches the insurance record from the database using `Insurance.findByPk`.
 * - Selects detailed attributes for full insurance information.
 * - Formats and enriches the response with computed fields (address, full phone number).
 *
 * Behavior:
 * - Ensures only authenticated admin requests are processed.
 * - Returns a fully structured insurance object for frontend display.
 * - Enhances raw database data with computed, human-readable fields.
 *
 * Error handling:
 * - Returns 400 if admin ID is missing or invalid.
 * - Returns 400 if insurance is not found.
 * - Returns 500 if a database or unexpected server error occurs.
 *
 * @param {Object} req - Express request object.
 *   - `req.admin_id` {number} Admin ID injected by authentication middleware.
 *   - `req.params.insurance_id` {string|number} Insurance ID to retrieve.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response containing:
 *   - 200: Detailed insurance organism object
 *   - 400: Missing/invalid admin ID or not found
 *   - 500: Internal server error
 *
 * @sideEffects
 * - None (read-only database operation).
 */

import { getValidId } from '../../../middlewares/getValidId.js';
import { Insurance } from '../../../models/index.js';

export default async function getOneInsuranceOrganismAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin ID is required.' });
  } else {
    try {
      const insurance_id = getValidId(req.params.insurance_id, 'Insurance ID');

      const foundInsurance = await Insurance.findByPk(insurance_id, {
        attributes: [
          'id',
          'name',
          'amc_code',
          'street_number',
          'street_name',
          'postal_code',
          'city',
          'phone_number',
          'prefix',
          'full_phone_number',
        ],
      });

      const sentInsurance = {
        id: foundInsurance.id,
        name: foundInsurance.name,
        amc_code: foundInsurance.amc_code,
        street_number: foundInsurance.street_number,
        street_name: foundInsurance.street_name,
        postal_code: foundInsurance.postal_code,
        city: foundInsurance.city,
        address: `${foundInsurance.street_number} ${foundInsurance.street_name}, ${foundInsurance.postal_code} ${foundInsurance.city}`,
        phone_number: foundInsurance.phone_number,
        prefix: foundInsurance.prefix,
        full_phone_number: `${foundInsurance.prefix}${foundInsurance.phone_number}`,
      };

      if (!foundInsurance) {
        return res.status(400).json({ message: 'Insurance not found' });
      } else {
        return res.status(200).json(sentInsurance);
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching insurance.' });
    }
  }
}
