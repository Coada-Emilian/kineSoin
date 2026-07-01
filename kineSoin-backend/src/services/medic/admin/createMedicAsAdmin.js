/**
 * @description Creates a new medic record associated with an administrator.
 *
 * Responsibilities:
 * - Validates the admin context and incoming medic data.
 * - Applies business rules required before creating a medic.
 * - Persists the new medic through the database model layer.
 *
 * Notes:
 * - This layer is independent from HTTP concerns.
 * - Request handling and response formatting are managed by the handler.
 */

import { Admin, Medic } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function createMedicAsAdmin({ adminId, medicData }) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const newMedic = {
    admin_id,
    ...medicData,
    full_phone_number: medicData.prefix + medicData.phone_number,
  };

  return Medic.create(newMedic);
}
