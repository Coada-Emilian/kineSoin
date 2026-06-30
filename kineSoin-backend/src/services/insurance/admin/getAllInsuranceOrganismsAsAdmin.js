/**
 * @description Retrieves all insurance organisms for the authenticated admin,
 *              returning a lightweight list suitable for administrative dashboards.
 *
 * Rationale:
 * - Ensures only verified administrators can access insurance‑organism data,
 *   preserving system integrity and preventing unauthorized reads.
 * - Keeps the controller focused on validation, structured querying, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates the admin ID before performing any read operation.
 * - Returns a normalized dataset containing only essential fields (id, name, amc_code)
 *   to keep responses efficient and frontend‑friendly.
 * - Provides clear, consistent HTTP status codes for empty results and unexpected errors.
 */

import { Admin, Insurance } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getAllInsuranceOrganismsAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  try {
    const allInsurances = await Insurance.findAll({
      attributes: ['id', 'name', 'amc_code'],
    });

    if (!allInsurances) {
      return res.status(400).json({ message: 'No insurance found' });
    } else {
      const allInsurancesData = allInsurances.map((insurance) => ({
        id: insurance.id,
        name: insurance.name,
        amc_code: insurance.amc_code,
      }));

      return res.status(200).json(allInsurancesData);
    }
  } catch (error) {
    console.error('Error fetching insurances:', error);

    return res.status(500).json({
      message: 'Error fetching insurances:',
      error: error.message,
    });
  }
}
