/**
 * @description Handles updating an existing therapist account by an authenticated admin.
 *
 * Responsibilities:
 * - Validates incoming therapist update data.
 * - Retrieves uploaded file information from the request.
 * - Retrieves the authenticated admin identity and target therapist ID.
 * - Delegates therapist update logic to the service layer.
 * - Returns the appropriate HTTP response.
 *
 * Notes:
 * - This handler only manages HTTP concerns.
 * - Business rules, file handling logic, and database operations are handled by the service layer.
 */

import updateTherapistService from '../../../../../services/therapist/admin/updateTherapistAsAdmin.js';
import updatedTherapistSchema from '../../../../../validations/joi/update/updatedTherapistSchema.js';

export default async function updateTherapistAsAdmin(req, res) {
  const { error } = updatedTherapistSchema.validate(req.body);

  if (error) {
    const err = new Error(error.message);
    err.statusCode = 400;
    throw err;
  }

  const therapistData = {
    ...req.body,
    file: req.file,
  };

  const updatedTherapist = await updateTherapistService({
    adminId: req.user.id,
    therapistId: req.params.therapist_id,
    therapistData,
  });

  return res.status(200).json({ message: 'Therapist updated successfully!' });
}
