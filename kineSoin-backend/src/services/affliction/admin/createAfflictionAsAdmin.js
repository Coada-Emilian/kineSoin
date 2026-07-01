/**
 * @description Creates a new affliction associated with an authenticated admin.
 *
 * Responsibilities:
 * - Validates the provided admin identifier.
 * - Ensures the admin exists before creation.
 * - Builds the affliction payload.
 * - Persists the new affliction in the database.
 *
 * Notes:
 * - This service contains business logic only.
 * - It does not depend on Express request/response objects.
 */

import { Admin, Affliction } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function createAfflictionAsAdmin({
  adminId,
  afflictionData,
}) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const newAffliction = {
    admin_id,
    ...afflictionData,
  };

  return await Affliction.create(newAffliction);
}
