/**
 * @description Retrieves a single affliction with its associated body region information.
 *
 * Responsibilities:
 * - Validates the provided admin identifier.
 * - Ensures the admin exists before accessing affliction data.
 * - Validates the affliction identifier.
 * - Retrieves the requested affliction and related information.
 *
 * Notes:
 * - This service contains business logic and database operations only.
 * - It does not depend on Express request/response objects.
 */

import { Admin, Affliction } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getOneAfflictionAsAdmin({
  adminId,
  afflictionId,
}) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const affliction_id = getValidId(afflictionId, 'Affliction ID');

  const foundAffliction = await Affliction.findByPk(affliction_id, {
    attributes: ['id', 'name', 'description', 'insurance_code', 'is_operated'],
    include: [
      {
        association: 'body_region',
        attributes: ['id', 'name'],
      },
    ],
  });

  return foundAffliction;
}
