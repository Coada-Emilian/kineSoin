/**
 * @description Toggles the active status of an existing therapist account.
 *
 * Responsibilities:
 * - Validates the provided admin identifier.
 * - Ensures the admin exists before modifying data.
 * - Validates the therapist identifier.
 * - Ensures the therapist exists.
 * - Switches the therapist status between active and inactive.
 * - Persists the updated therapist status.
 *
 * Notes:
 * - This service contains business logic and database operations only.
 * - It does not depend on Express request/response objects.
 */

import { Admin, Therapist } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function toggleTherapistStatusAsAdmin({
  adminId,
  therapistId,
}) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const therapist_id = getValidId(therapistId, 'Therapist ID');

  const foundTherapist = await findOrThrow(
    Therapist,
    therapist_id,
    'Therapist'
  );

  if (foundTherapist.status === 'active') {
    foundTherapist.status = 'inactive';
  } else {
    foundTherapist.status = 'active';
  }

  await foundTherapist.save();
}
