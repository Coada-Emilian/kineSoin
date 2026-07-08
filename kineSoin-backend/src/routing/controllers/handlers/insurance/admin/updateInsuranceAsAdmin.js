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
  const { error } = updatedInsuranceSchema.validate(req.body);

  if (error) {
    const err = new Error(error.message);
    err.statusCode = 400;
    throw err;
  }

  const updatedInsurance = await updateInsuranceService({
    adminId: req.user.id,
    insuranceId: req.params.insurance_id,
    insuranceData: req.body,
  });

  return res.status(200).json({ message: 'Insurance organisation updated' });
}
