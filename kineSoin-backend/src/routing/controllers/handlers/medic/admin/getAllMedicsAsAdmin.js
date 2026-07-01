/**
 * @description Handles retrieving all medics for an authenticated admin.
 *
 * Responsibilities:
 * - Retrieves the authenticated admin identity.
 * - Delegates medic retrieval logic to the service layer.
 * - Returns the appropriate HTTP response.
 *
 * Notes:
 * - This handler only manages HTTP concerns.
 * - Business rules and database operations are handled by the service layer.
 */

import getAllMedicsService from '../../../../../services/medic/admin/getAllMedicsAsAdmin.js';

export default async function getAllMedicsAsAdmin(req, res) {
  try {
    const medics = await getAllMedicsService({ adminId: req.admin_id });

    if (medics.length === 0) {
      return res.status(404).json({ message: 'No medics found.' });
    }
    return res.status(200).json(medics);
  } catch (error) {
    console.error('Error fetching medics:', error);

    return res.status(error.statusCode || 500).json({
      message: error.message || 'Error fetching medics.',
    });
  }
}
