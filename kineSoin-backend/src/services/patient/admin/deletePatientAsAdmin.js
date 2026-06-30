/**
 * @description Deletes a patient record for the authenticated admin, ensuring the
 *              operation is authorized and the patient exists before performing
 *              any destructive action.
 *
 * Rationale:
 * - Restricts patient removal to verified administrators, protecting system integrity
 *   and preventing unauthorized account deletion.
 * - Keeps the controller focused on validation, lookup, and predictable response
 *   formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates both admin and patient IDs before performing any write operation.
 * - Uses a direct `destroy` call and checks the result to confirm whether a record
 *   was actually removed.
 * - Returns clear, consistent HTTP status codes for missing records, successful
 *   deletions, and unexpected server errors.
 */

import { Admin, Patient } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';

export default async function deletePatientAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

  try {
    const patient_id = getValidId(req.params.patient_id, 'Patient ID');

    const response = await Patient.destroy({ where: { id: patient_id } });

    if (!response) {
      return res.status(400).json({ message: 'Patient not found' });
    } else {
      return res.status(200).json({ message: 'Patient deleted successfully!' });
    }
  } catch (error) {
    console.error('Error deleting patient:', error);

    return res.status(500).json({
      message: 'Error deleting patient:',
      error: error.message,
    });
  }
}
