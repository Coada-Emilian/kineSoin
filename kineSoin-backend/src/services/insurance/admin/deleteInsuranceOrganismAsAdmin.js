/**
 * @description Deletes an insurance organism on behalf of the authenticated admin,
 *              ensuring only authorized users can remove insurance records.
 *
 * Rationale:
 * - Protects system integrity by restricting destructive actions to verified admins.
 * - Keeps the controller focused on validation, ownership checks, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates both admin and insurance IDs before performing any deletion.
 * - Uses a direct model lookup to ensure the insurance organism exists prior to removal.
 * - Returns clear, consistent HTTP status codes for invalid IDs, missing records,
 *   successful deletions, and unexpected server errors.
 */

import { Admin, Insurance } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function deleteInsuranceOrganismAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  try {
    const insurance_id = getValidId(req.params.insurance_id, 'Insurance ID');

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
    console.error('Error deleting insurance:', error);

    return res.status(500).json({
      message: 'Error deleting insurance.',
      error: error.message,
    });
  }
}
