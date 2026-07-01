/**
 * @description Retrieves all therapists with formatted information for an authenticated admin.
 *
 * Responsibilities:
 * - Validates the provided admin identifier.
 * - Ensures the admin exists before accessing therapist data.
 * - Retrieves therapist records from the database.
 * - Formats therapist information for frontend consumption.
 * - Orders therapists by status and name.
 *
 * Notes:
 * - This service contains business logic and database operations only.
 * - It does not depend on Express request/response objects.
 */

import { Admin, Therapist } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getAllTherapistsAsAdmin({ adminId }) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const foundTherapists = await Therapist.findAll({
    attributes: ['id', 'name', 'surname', 'status'],
    order: [
      ['status', 'ASC'],
      ['name', 'ASC'],
    ],
  });

  const sentTherapists = foundTherapists.map((therapist) => ({
    id: therapist.id,
    fullName: `${therapist.name} ${therapist.surname}`,
    status: therapist.status,
  }));

  return sentTherapists;
}
