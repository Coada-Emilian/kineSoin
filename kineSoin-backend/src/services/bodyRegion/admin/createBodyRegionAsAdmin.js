/**
 * @description Creates a new body region associated with an authenticated admin.
 *
 * Responsibilities:
 * - Validates the provided admin identifier.
 * - Ensures the admin exists before creating data.
 * - Builds the body region creation payload.
 * - Persists the new body region in the database.
 *
 * Notes:
 * - This service contains business logic and database operations only.
 * - It does not depend on Express request/response objects.
 */

import { Admin, Body_region } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function createBodyRegionAsAdmin({
  adminId,
  bodyRegionData,
}) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const newBodyRegion = {
    admin_id,
    name: bodyRegionData.name,
  };

  return await Body_region.create(newBodyRegion);
}
