/**
 * @description Deletes an existing body region associated with an authenticated admin.
 *
 * Responsibilities:
 * - Validates the provided admin identifier.
 * - Ensures the admin exists before performing the operation.
 * - Validates the body region identifier.
 * - Ensures the body region exists.
 * - Removes the body region from the database.
 *
 * Notes:
 * - This service contains business logic and database operations only.
 * - It does not depend on Express request/response objects.
 */

import { Admin, Body_region } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function deleteBodyRegionAsAdmin({
  adminId,
  bodyRegionId,
}) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const body_region_id = getValidId(bodyRegionId, 'Body region ID');

  const foundBodyRegion = await findOrThrow(
    Body_region,
    body_region_id,
    'Body_region'
  );

  await foundBodyRegion.destroy();
}
