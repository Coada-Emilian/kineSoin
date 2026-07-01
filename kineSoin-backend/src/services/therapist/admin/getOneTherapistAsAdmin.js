/**
 * @description Retrieves a single therapist with formatted and sanitized information.
 *
 * Responsibilities:
 * - Validates the provided admin identifier.
 * - Ensures the admin exists before accessing therapist data.
 * - Validates the therapist identifier.
 * - Retrieves therapist information from the database.
 * - Excludes sensitive fields from the returned data.
 * - Formats full name and phone number for application use.
 *
 * Notes:
 * - This service contains business logic and database operations only.
 * - It does not depend on Express request/response objects.
 */

import { Admin, Therapist } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getOneTherapistAsAdmin({ adminId, therapistId }) {
  const admin_id = getValidId(adminId, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const therapist_id = getValidId(therapistId, 'Therapist ID');

  const foundTherapist = await Therapist.findByPk(therapist_id, {
    attributes: {
      exclude: [
        'password',
        'old_password',
        'new_password',
        'repeated_password',
        'created_at',
        'updated_at',
        'picture_id',
      ],
    },
  });

  if (!foundTherapist) {
    throw new Error('Therapist not found');
  }

  const sentTherapist = {
    ...foundTherapist.dataValues,
    full_name: `${foundTherapist.name} ${foundTherapist.surname}`,
    full_phone_number: `${foundTherapist.prefix} ${foundTherapist.phone_number}`,
  };

  return sentTherapist;
}
