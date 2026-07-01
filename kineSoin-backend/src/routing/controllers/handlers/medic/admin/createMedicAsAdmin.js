/**
 * @description Handles the creation of a medic by an authenticated admin.
 *
 * Responsibilities:
 * - Validates incoming medic data.
 * - Retrieves the authenticated admin identity.
 * - Delegates medic creation logic to the service layer.
 * - Returns the appropriate HTTP response.
 *
 * Notes:
 * - This handler only manages HTTP concerns.
 * - Business rules and database operations are handled by the service layer.
 */

import createMedicService from '../../../../../services/medic/admin/createMedicAsAdmin.js';
import createdMedicSchema from '../../../../../validations/joi/creation/createdMedicSchema.js';

export default async function createMedicAsAdmin(req, res) {
  try {
    const { error } = createdMedicSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const createdMedic = await createMedicService({
      adminId: req.admin_id,
      medicData: req.body,
    });

    if (!createdMedic) {
      return res.status(500).json({ message: 'Error while creating medic.' });
    }

    return res.status(201).json({
      message: 'Medic created.',
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || 'Error creating medic.',
    });
  }
}
