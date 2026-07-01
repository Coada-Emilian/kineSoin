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
  try {
    const { error } = updatedTherapistStatusSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    await changeTherapistStatusService({
      adminId: req.admin_id,
      therapistId: req.params.therapist_id,
      statusData: req.body,
    });

    return res
      .status(200)
      .json({ message: 'Therapist status updated successfully!' });
  } catch (error) {
    console.error('Error changing therapist status:', error);

    return res.status(error.statusCode || 500).json({
      message: error.message || 'Error changing therapist status.',
    });
  }
}
