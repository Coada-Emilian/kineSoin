/**
 * @description Handles retrieving a single affliction for an authenticated admin.
 *
 * Responsibilities:
 * - Retrieves the authenticated admin identity and target affliction ID.
 * - Delegates affliction retrieval logic to the service layer.
 * - Returns the appropriate HTTP response.
 *
 * Notes:
 * - This handler only manages HTTP concerns.
 * - Business rules and database operations are handled by the service layer.
 */

import getOneAfflictionService from '../../../../../services/affliction/admin/getOneAfflictionAsAdmin.js';

export default async function getOneAfflictionAsAdmin(req, res) {
  try {
    const affliction = await getOneAfflictionService({
      adminId: req.admin_id,
      afflictionId: req.params.affliction_id,
    });

    if (!affliction) {
      return res.status(404).json({ message: 'Affliction not found.' });
    }

    return res.status(200).json(affliction);
  } catch (error) {
    console.error('Error fetching affliction:', error);

    return res.status(error.statusCode || 500).json({
      message: error.message || 'Error fetching affliction.',
    });
  }
}
