/**
 * @description Retrieves a single insurance organism for the authenticated admin,
 *              returning a normalized, frontend‑ready structure with full address
 *              and phone metadata.
 *
 * Rationale:
 * - Ensures only verified administrators can access detailed insurance‑organism data,
 *   preserving system integrity and preventing unauthorized reads.
 * - Keeps the controller focused on validation, lookup, and predictable response
 *   formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates both admin and insurance IDs before performing any read operation.
 * - Normalizes the insurance record into a clean payload (address, full phone number)
 *   to simplify frontend consumption.
 * - Returns clear, consistent HTTP status codes for invalid IDs, missing records,
 *   and unexpected server errors.
 */

import { Admin, Insurance } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getOneInsuranceOrganismAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

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
    console.error('Error fetching insurance:', error);

    return res.status(500).json({
      message: 'Error fetching insurance:',
      error: error.message,
    });
  }
}
