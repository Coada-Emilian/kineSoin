/**
 * @description Toggles a therapist’s status (`active` ↔ `inactive`) for the
 *              authenticated admin, validating identities before applying the
 *              update.
 *
 * Rationale:
 * - Ensures only verified admins can modify therapist availability, protecting
 *   system integrity and preventing unauthorized administrative actions.
 * - Keeps the controller focused on validation, simple state transitions, and
 *   predictable response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates admin and therapist IDs before performing any write operation.
 * - Performs a direct toggle between `active` and `inactive` without requiring
 *   additional payload or schema validation.
 * - Returns consistent HTTP status codes for missing records, successful updates,
 *   and unexpected server errors.
 */

import { Admin, Therapist } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function toggleTherapistStatusAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  try {
    const therapist_id = getValidId(req.params.therapist_id, 'Therapist ID');

    const foundTherapist = await Therapist.findByPk(therapist_id);

    if (!foundTherapist) {
      return res.status(400).json({ message: 'Therapist not found' });
    }

    if (foundTherapist.status === 'active') {
      foundTherapist.status = 'inactive';
    } else {
      foundTherapist.status = 'active';
    }

    await foundTherapist.save();

    return res
      .status(200)
      .json({ message: 'Therapist status updated successfully!' });
  } catch (error) {
    console.error('Error toggling therapist status:', error);

    return res.status(500).json({
      message: 'Error toggling therapist status:',
      error: error.message,
    });
  }
}
