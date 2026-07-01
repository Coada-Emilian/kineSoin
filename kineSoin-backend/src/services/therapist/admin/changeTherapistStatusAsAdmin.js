/**
 * @description Updates the status of an existing therapist account.
 *
 * Responsibilities:
 * - Validates the provided admin identifier.
 * - Ensures the admin exists before modifying data.
 * - Validates the therapist identifier.
 * - Ensures the therapist exists.
 * - Updates the therapist status in the database.
 *
 * Notes:
 * - This service contains business logic and database operations only.
 * - It does not depend on Express request/response objects.
 */

import { Admin, Therapist } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function changeTherapistStatusAsAdmin({
  adminId,
  therapistId,
  statusData,
}) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const therapist_id = getValidId(therapistId, 'Therapist ID');

  const { status } = statusData;

  const foundTherapist = await findOrThrow(
    Therapist,
    therapist_id,
    'Therapist'
  );

  await foundTherapist.update({ status });
}
