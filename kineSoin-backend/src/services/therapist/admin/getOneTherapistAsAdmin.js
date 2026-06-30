/**
 * @description Retrieves a single therapist for the authenticated admin, returning
 *              a sanitized profile with computed fields such as full name and full
 *              phone number.
 *
 * Rationale:
 * - Ensures only verified admins can access detailed therapist records, protecting
 *   system integrity and preventing unauthorized data exposure.
 * - Keeps the controller focused on validation, structured querying, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates admin and therapist IDs before performing any read operation.
 * - Excludes sensitive fields (passwords, timestamps, internal picture IDs) from
 *   the returned payload.
 * - Computes `fullName` and `fullPhoneNumber` for clearer administrative display.
 * - Provides consistent HTTP status codes for missing records, successful retrieval,
 *   and unexpected server errors.
 */

import { Admin, Therapist } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function getOneTherapistAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  const therapist_id = getValidId(req.params.therapist_id, 'Therapist ID');

  try {
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
      return res.status(400).json({ message: 'Therapist not found' });
    }
    const fullPhoneNumber = `${foundTherapist.prefix}${foundTherapist.phone_number}`;

    const fullName = `${foundTherapist.name} ${foundTherapist.surname}`;

    return res
      .status(200)
      .json({ ...foundTherapist.dataValues, fullName, fullPhoneNumber });
  } catch (error) {
    console.error('Error fetching therapist:', error);

    return res.status(500).json({
      message: 'Error fetching therapist:',
      error: error.message,
    });
  }
}
