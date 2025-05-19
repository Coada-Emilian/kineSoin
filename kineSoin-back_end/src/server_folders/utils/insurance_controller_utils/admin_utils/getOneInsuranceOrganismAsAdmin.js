/**
 * @function getOneInsuranceOrganismAsAdmin
 * @description
 * Retrieves detailed information about a specific insurance organism for admin users.
 *
 * Steps:
 * 1. Validates `admin_id` from the authenticated context.
 * 2. Parses and validates `insurance_id` from request parameters.
 * 3. Retrieves the insurance record from the database using `findByPk()`.
 * 4. Constructs a response object with relevant insurance details including a formatted address and full phone number.
 *
 * Responses:
 * - 200: Returns the detailed insurance information.
 * - 400: If `admin_id` or `insurance_id` is invalid or if the insurance is not found.
 * - 500: On internal server error during data retrieval.
 *
 * @param {Object} req - Express request object; expects `admin_id` and `insurance_id`.
 * @param {Object} res - Express response object for sending data or errors.
 */

import { Insurance } from '../../../models/index.js';
import { checkIsValidNumber } from '../../checkIsValidNumber.js';

export default async function getOneInsuranceOrganismAsAdmin(req, res) {
  const admin_id = parseInt(req.admin_id, 10);

  checkIsValidNumber(admin_id);
  if (!admin_id) {
    return res.status(400).json({ message: 'Admin ID is required.' });
  } else {
    try {
      const insurance_id = parseInt(req.params.insurance_id, 10);

      checkIsValidNumber(insurance_id);

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

      const fullPhoneNumber =
        foundInsurance.prefix + foundInsurance.phone_number;

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
        full_phone_number: fullPhoneNumber,
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
