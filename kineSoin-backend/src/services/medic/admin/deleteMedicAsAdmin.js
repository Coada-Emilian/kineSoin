/**
 * @description Deletes an existing medic associated with an authenticated admin.
 *
 * Responsibilities:
 * - Validates the provided admin identifier.
 * - Ensures the admin exists before performing the operation.
 * - Validates the medic identifier.
 * - Ensures the medic exists.
 * - Removes the medic from the database.
 *
 * Notes:
 * - This service contains business logic and database operations only.
 * - It does not depend on Express request/response objects.
 */

import { Admin, Medic } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function deleteMedicAsAdmin({ adminId, medicId }) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const medic_id = getValidId(medicId, 'Medic ID');

  const foundMedic = await findOrThrow(Medic, medic_id, 'Medic');

  await foundMedic.destroy();
}
