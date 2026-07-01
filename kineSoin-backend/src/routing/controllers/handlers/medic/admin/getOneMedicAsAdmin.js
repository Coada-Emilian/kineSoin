/**
 * @description Handles retrieving a single medic for an authenticated admin.
 *
 * Responsibilities:
 * - Retrieves the authenticated admin identity and target medic ID.
 * - Delegates medic retrieval logic to the service layer.
 * - Returns the appropriate HTTP response.
 *
 * Notes:
 * - This handler only manages HTTP concerns.
 * - Business rules and database operations are handled by the service layer.
 */

import getOneMedicService from '../../../../../services/medic/admin/getOneMedicAsAdmin.js';

export default async function getOneMedicAsAdmin(req, res) {
  try {
    const foundMedic = await getOneMedicService({
      adminId: req.admin_id,
      medicId: req.params.medic_id,
    });

    if (!foundMedic) {
      return res.status(404).json({ message: 'No medic found.' });
    }
    return res.status(200).json(foundMedic);
  } catch (error) {
    console.error('Error fetching medic:', error);

    return res.status(error.statusCode || 500).json({
      message: error.message || 'Error fetching medic.',
    });
  }
}
