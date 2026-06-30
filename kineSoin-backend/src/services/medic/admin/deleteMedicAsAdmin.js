/**
 * @description Deletes an existing medic record on behalf of the authenticated admin,
 *              ensuring only authorized users can perform destructive operations.
 *
 * Rationale:
 * - Protects system integrity by restricting medic removal to verified administrators.
 * - Keeps the controller focused on validation, lookup, and predictable response
 *   formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates both admin and medic IDs before performing any deletion.
 * - Confirms the medic exists before attempting removal to avoid silent failures.
 * - Returns clear, consistent HTTP status codes for missing records, successful
 *   deletions, and unexpected server errors.
 */

import { Admin, Medic } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function deleteMedicAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  try {
    const medic_id = getValidId(req.params.medic_id, 'Medic ID');

    const foundMedic = await Medic.findByPk(medic_id);

    if (!foundMedic) {
      return res.status(404).json({ message: 'Medic not found.' });
    } else {
      const deletedMedic = await foundMedic.destroy();

      if (!deletedMedic) {
        return res.status(500).json({ message: 'Error while deleting medic.' });
      } else {
        return res.status(200).json({ message: 'Medic deleted successfully.' });
      }
    }
  } catch (error) {
    console.error('Error deleting medic:', error);

    return res.status(500).json({
      message: 'Error deleting medic:',
      error: error.message,
    });
  }
}
