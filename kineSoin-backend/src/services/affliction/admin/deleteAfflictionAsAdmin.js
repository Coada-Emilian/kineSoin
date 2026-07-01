/**
 * @description Deletes an existing affliction created through the admin interface.
 *
 * Responsibilities:
 * - Validates the provided admin identifier.
 * - Ensures the admin exists before performing the operation.
 * - Validates the affliction identifier.
 * - Ensures the affliction exists and removes it from the database.
 *
 * Notes:
 * - This service contains business logic only.
 * - It does not depend on Express request/response objects.
 */

import { Admin, Affliction } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function deleteAfflictionAsAdmin({
  adminId,
  afflictionId,
}) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const affliction_id = getValidId(afflictionId, 'Affliction ID');

  const foundAffliction = await findOrThrow(
    Affliction,
    affliction_id,
    'Affliction'
  );

  await foundAffliction.destroy();
}
