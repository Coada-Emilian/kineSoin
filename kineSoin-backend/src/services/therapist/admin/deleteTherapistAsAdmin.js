/**
 * @description Deletes an existing therapist account associated with an authenticated admin.
 *
 * Responsibilities:
 * - Validates the provided admin identifier.
 * - Ensures the admin exists before performing the operation.
 * - Validates the therapist identifier.
 * - Ensures the therapist exists.
 * - Removes the therapist account from the database.
 *
 * Notes:
 * - This service contains business logic and database operations only.
 * - It does not depend on Express request/response objects.
 */

import { Admin, Therapist } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function deleteTherapistAsAdmin({ adminId, therapistId }) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const therapist_id = getValidId(therapistId, 'Therapist ID');

  const foundTherapist = await findOrThrow(
    Therapist,
    therapist_id,
    'Therapist'
  );

  await foundTherapist.destroy();
}
