/**
 * @description Creates a new medic associated with an authenticated admin.
 *
 * Responsibilities:
 * - Validates the provided admin identifier.
 * - Ensures the admin exists before creating data.
 * - Builds the medic creation payload.
 * - Generates the full phone number from the provided prefix and phone number.
 * - Persists the new medic in the database.
 *
 * Notes:
 * - This service contains business logic and database operations only.
 * - It does not depend on Express request/response objects.
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
