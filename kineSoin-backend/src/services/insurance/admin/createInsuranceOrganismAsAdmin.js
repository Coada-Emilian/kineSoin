/**
 * @description Creates a new insurance organism on behalf of the authenticated admin,
 *              using validated input and storing a fully structured insurance record.
 *
 * Rationale:
 * - Ensures only verified administrators can create insurance organisms,
 *   preserving system integrity and preventing unauthorized data creation.
 * - Keeps the controller focused on validation, structured data assembly, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates the admin ID and all insurance‑creation fields before performing any write.
 * - Automatically builds a normalized insurance payload, including a combined phone number.
 * - Returns clear, consistent HTTP status codes for invalid input, failed creation,
 *   and unexpected server errors.
 */

import { Admin, Insurance } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';
import createdInsuranceSchema from '../../../validations/joi/creation/createdInsuranceSchema.js';

export default async function createInsuranceOrganismAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  try {
    if (!req.body) {
      return res.status(400).json({
        message: 'Request body is missing. Please provide the necessary data.',
      });
    }
    const { error } = createdInsuranceSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const {
      name,
      amc_code,
      street_number,
      street_name,
      postal_code,
      city,
      phone_number,
      prefix,
    } = req.body;

    const sentInsurance = {
      admin_id,
      name,
      amc_code,
      street_number,
      street_name,
      postal_code,
      city,
      phone_number,
      prefix,
      full_phone_number: `${prefix}${phone_number}`,
    };

    const response = await Insurance.create(sentInsurance);
    if (response) {
      return res
        .status(200)
        .json({ message: 'Insurance organism created', response });
    } else {
      return res
        .status(400)
        .json({ message: 'Insurance organism not created', response });
    }
  } catch (error) {
    console.error('Error creating insurance:', error);

    return res.status(500).json({
      message: 'Error creating insurance:',
      error: error.message,
    });
  }
}
