/**
 * @description Deletes an existing insurance organization associated with an authenticated admin.
 *
 * Responsibilities:
 * - Validates the provided admin identifier.
 * - Ensures the admin exists before performing the operation.
 * - Validates the insurance identifier.
 * - Ensures the insurance organization exists.
 * - Removes the insurance organization from the database.
 *
 * Notes:
 * - This service contains business logic and database operations only.
 * - It does not depend on Express request/response objects.
 */

import { Admin, Insurance } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function deleteInsuranceAsAdmin({ adminId, insuranceId }) {
  const admin_id = getValidId(adminId, 'Admin ID');
  await findOrThrow(Admin, admin_id, 'Admin');

  const insurance_id = getValidId(insuranceId, 'Insurance ID');

  const foundInsurance = await findOrThrow(
    Insurance,
    insurance_id,
    'Insurance'
  );

  await foundInsurance.destroy();
}
