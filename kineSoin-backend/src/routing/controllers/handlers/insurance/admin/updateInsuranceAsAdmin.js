/**
 * @description Handles updating an existing insurance organization by an authenticated admin.
 *
 * Responsibilities:
 * - Validates incoming update data.
 * - Retrieves the authenticated admin identity and target insurance ID.
 * - Delegates update logic to the service layer.
 * - Returns the appropriate HTTP response.
 *
 * Notes:
 * - This handler only manages HTTP concerns.
 * - Business rules and database operations are handled by the service layer.
 */

import updateInsuranceService from '../../../../../services/insurance/admin/updateInsuranceAsAdmin.js';
import updatedInsuranceSchema from '../../../../../validations/joi/update/updatedInsuranceSchema.js';

export default async function updateInsuranceAsAdmin(req, res) {
  try {
    const { error } = updatedInsuranceSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const updatedInsurance = await updateInsuranceService({
      adminId: req.admin_id,
      insuranceId: req.params.insurance_id,
      insuranceData: req.body,
    });

    return res.status(200).json({ message: 'Insurance organisation updated' });
  } catch (error) {
    console.error('Error updating insurance:', error);

    return res.status(error.statusCode || 500).json({
      message: error.message || 'Error updating insurance.',
    });
  }
}
