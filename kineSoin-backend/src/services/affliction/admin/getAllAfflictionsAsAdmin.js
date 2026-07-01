/**
 * @description Retrieves all afflictions with their associated body region information.
 *
 * Responsibilities:
 * - Validates the provided admin identifier.
 * - Ensures the admin exists before accessing affliction data.
 * - Retrieves and formats affliction records with required related data.
 *
 * Notes:
 * - This service contains business logic and database operations only.
 * - It does not depend on Express request/response objects.
 */

import { Admin, Affliction } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getAllAfflictionsAsAdmin({ adminId }) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const foundAfflictions = await Affliction.findAll({
    attributes: [
      'id',
      'name',
      'insurance_code',
      'is_operated',
      'body_region_id',
    ],
    order: [
      ['body_region_id', 'ASC'],
      ['name', 'ASC'],
    ],
    include: [
      {
        association: 'body_region',
        attributes: ['id', 'name'],
      },
    ],
  });

  return foundAfflictions;
}
