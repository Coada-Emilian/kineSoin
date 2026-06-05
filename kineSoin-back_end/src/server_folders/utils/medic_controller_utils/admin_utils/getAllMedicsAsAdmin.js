/**
 * @function getAllMedicsAsAdmin
 * @description
 * Retrieves all medics for administrative purposes.
 *
 * This controller:
 * - Validates the admin ID using `getValidId`.
 * - Fetches all medics from the database.
 * - Selects only relevant fields needed for the admin interface.
 * - Transforms database records into a simplified response format.
 * - Combines the medic's name and surname into a single `fullName` field.
 *
 * Data transformation includes:
 * - fullName: concatenation of medic name and surname
 * - licence_code: professional licence identifier
 *
 * Behavior:
 * - Returns a list of medics with simplified and formatted data.
 * - Returns 404 if no medics are found.
 *
 * Error handling:
 * - Returns 400 if admin ID is invalid or missing.
 * - Returns 404 if no medics exist in the database.
 * - Returns 500 for unexpected server/database errors.
 *
 * @param {Object} req - Express request object.
 *   - `req.admin_id` {number} Admin ID injected by authentication middleware.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object[]} JSON array containing formatted medic information.
 *
 * @sideEffects
 * - No database mutations; read-only operation.
 */

import { getValidId } from '../../../middlewares/getValidId.js';
import { Medic } from '../../../models/index.js';

export default async function getAllMedicsAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin ID is required.' });
  } else {
    try {
      const foundMedics = await Medic.findAll({
        attributes: [
          'id',
          'name',
          'surname',
          // 'street_number',
          // 'street_name',
          // 'postal_code',
          // 'city',
          // 'phone_number',
          'licence_code',
        ],
      });

      if (foundMedics.length === 0) {
        return res.status(404).json({ message: 'No medics found.' });
      } else {
        const sentMedics = [];

        for (const medic of foundMedics) {
          const newMedic = {
            id: medic.id,
            fullName: `${medic.name} ${medic.surname}`,
            // address: `${medic.street_number} ${medic.street_name}, ${medic.postal_code} ${medic.city}`,
            // phone_number: medic.phone_number,
            licence_code: medic.licence_code,
          };

          sentMedics.push(newMedic);
        }
        return res.status(200).json(sentMedics);
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching medics.' });
    }
  }
}
