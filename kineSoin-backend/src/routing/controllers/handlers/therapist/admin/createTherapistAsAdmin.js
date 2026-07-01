/**
 * @description Handles the creation of a therapist account by an authenticated admin.
 *
 * Responsibilities:
 * - Validates incoming therapist data.
 * - Retrieves uploaded file information from the request.
 * - Retrieves the authenticated admin identity.
 * - Delegates therapist creation logic to the service layer.
 * - Returns the appropriate HTTP response.
 *
 * Notes:
 * - This handler only manages HTTP concerns.
 * - Account creation rules, data processing, and persistence are handled by the service layer.
 */

import createTherapistService from '../../../../../services/therapist/admin/createTherapistAsAdmin.js';
import createdTherapistSchema from '../../../../../validations/joi/creation/createdTherapistSchema.js';

export default async function createTherapistAsAdmin(req, res) {
  try {
    const { error } = createdTherapistSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const therapistData = {
      ...req.body,
      file: req.file,
    };

    const newTherapist = await createTherapistService({
      adminId: req.admin_id,
      therapistData,
    });

    return res.status(201).json({
      message: 'Therapist created successfully!',
    });
  } catch (error) {
    console.error('Error creating therapist:', error);

    return res.status(error.statusCode || 500).json({
      message: error.message || 'Error creating therapist.',
    });
  }
}
