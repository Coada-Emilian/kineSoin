/**
 * @description Retrieves all insurance organizations with their required display information.
 *
 * Responsibilities:
 * - Validates the provided admin identifier.
 * - Ensures the admin exists before accessing insurance data.
 * - Retrieves insurance organizations from the database.
 * - Formats the returned insurance data for application use.
 *
 * Notes:
 * - This service contains business logic and database operations only.
 * - It does not depend on Express request/response objects.
 */

import { Admin, Insurance } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getAllInsurancesAsAdmin({ adminId }) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const foundInsurances = await Insurance.findAll({
    attributes: ['id', 'name', 'amc_code'],
  });

  const sentInsurances = foundInsurances.map((insurance) => ({
    id: insurance.id,
    name: insurance.name,
    amc_code: insurance.amc_code,
  }));

  return sentInsurances;
}
