/**
 * @description Deletes a therapist account from the admin panel, validating the
 *              admin’s identity before performing the destructive action.
 *
 * Rationale:
 * - Ensures only verified admins can remove therapist accounts, protecting system
 *   integrity and preventing unauthorized administrative deletions.
 * - Keeps the controller focused on validation, ownership checks, and predictable
 *   response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates the admin ID and therapist ID before performing any write operation.
 * - Uses a direct `destroy` query to remove the therapist record.
 * - Returns consistent HTTP status codes for missing records, successful deletions,
 *   and unexpected server errors.
 */

import { Admin, Therapist } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function deleteTherapistAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  try {
    const therapist_id = getValidId(req.params.therapist_id, 'Therapist ID');

    const response = await Therapist.destroy({
      where: { id: therapist_id },
    });

    if (!response) {
      return res.status(400).json({ message: 'Therapist not found' });
    } else {
      return res
        .status(200)
        .json({ message: 'Therapist deleted successfully!' });
    }
  } catch (error) {
    console.error('Error deleting therapist:', error);

    return res.status(500).json({
      message: 'Error deleting therapist:',
      error: error.message,
    });
  }
}
