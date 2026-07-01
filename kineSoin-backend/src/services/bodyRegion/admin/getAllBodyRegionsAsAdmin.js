/**
 * @description Retrieves all available body regions for an authenticated admin.
 *
 * Responsibilities:
 * - Validates the provided admin identifier.
 * - Ensures the admin exists before accessing body region data.
 * - Retrieves body regions with the required fields.
 * - Returns the ordered list of body regions.
 *
 * Notes:
 * - This service contains business logic and database operations only.
 * - It does not depend on Express request/response objects.
 */

import { Admin, Body_region } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getAllBodyRegionsAsAdmin({ adminId }) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const foundBodyRegions = await Body_region.findAll({
    attributes: ['id', 'name'],
    order: [['name', 'ASC']],
  });

  return foundBodyRegions;
}
