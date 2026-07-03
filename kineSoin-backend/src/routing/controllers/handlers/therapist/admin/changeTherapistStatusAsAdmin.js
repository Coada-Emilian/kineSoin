/**
 * @description Handles updating a therapist status by an authenticated admin.
 *
 * Responsibilities:
 * - Validates the incoming status update data.
 * - Retrieves the authenticated admin identity and target therapist ID.
 * - Delegates status update logic to the service layer.
 * - Returns the appropriate HTTP response.
 *
 * Notes:
 * - This handler only manages HTTP concerns.
 * - Business rules and database operations are handled by the service layer.
 */

import changeTherapistStatusService from '../../../../../services/therapist/admin/changeTherapistStatusAsAdmin.js';
import updatedTherapistStatusSchema from '../../../../../validations/joi/update/updatedTherapistStatusSchema.js';

export default async function changeTherapistStatusAsAdmin(req, res) {
  const { error } = updatedTherapistStatusSchema.validate(req.body);

  if (error) {
    const err = new Error(error.message);
    err.statusCode = 400;
    throw err;
  }

  await changeTherapistStatusService({
    adminId: req.admin_id,
    therapistId: req.params.therapist_id,
    statusData: req.body,
  });

  return res
    .status(200)
    .json({ message: 'Therapist status updated successfully!' });
}
