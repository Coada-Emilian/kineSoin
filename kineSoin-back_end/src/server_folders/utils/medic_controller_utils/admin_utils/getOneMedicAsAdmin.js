/**
 * @function getOneMedicAsAdmin
 * @description
 * Retrieves detailed information about a specific medic for administrative purposes.
 *
 * This controller:
 * - Validates the admin ID using `getValidId`.
 * - Validates the medic ID from request parameters.
 * - Fetches the medic from the database using its primary key.
 * - Selects relevant personal and professional information.
 * - Formats additional fields such as full name, full address, and full phone number.
 * - Returns a structured response optimized for the admin interface.
 *
 * Data transformation includes:
 * - fullName: concatenation of medic name and surname
 * - address: formatted string combining street and location details
 * - full_phone_number: concatenation of prefix and phone number
 *
 * Behavior:
 * - Returns detailed information for a single medic.
 * - Ensures the requested medic exists before returning data.
 *
 * Error handling:
 * - Returns 400 if admin ID or medic ID is invalid.
 * - Returns 404 if the medic is not found.
 * - Returns 500 for unexpected server/database errors.
 *
 * @param {Object} req - Express request object.
 *   - `req.admin_id` {number} Admin ID injected by authentication middleware.
 *   - `req.params.medic_id` {string|number} Medic ID to retrieve.
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON object containing detailed medic information.
 *
 * @sideEffects
 * - No database mutations; read-only operation.
 */

import { getValidId } from '../../../middlewares/getValidId.js';
import { Medic } from '../../../models/index.js';

export default async function getOneMedicAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  try {
    const medic_id = getValidId(req.params.medic_id, 'Patient ID');

    const foundMedic = await Medic.findByPk(medic_id, {
      attributes: [
        'id',
        'name',
        'surname',
        'street_number',
        'street_name',
        'postal_code',
        'city',
        'prefix',
        'phone_number',
        'licence_code',
        'email',
      ],
    });

    if (!foundMedic) {
      return res.status(404).json({ message: 'No medic found.' });
    } else {
      const sentMedic = {
        id: foundMedic.id,
        name: foundMedic.name,
        surname: foundMedic.surname,
        street_number: foundMedic.street_number,
        street_name: foundMedic.street_name,
        postal_code: foundMedic.postal_code,
        city: foundMedic.city,
        full_name: `${foundMedic.name} ${foundMedic.surname}`,
        address: `${foundMedic.street_number} ${foundMedic.street_name}, ${foundMedic.postal_code} ${foundMedic.city}`,
        phone_number: foundMedic.phone_number,
        prefix: foundMedic.prefix,
        full_phone_number: `${foundMedic.prefix}  ${foundMedic.phone_number}`,
        licence_code: foundMedic.licence_code,
        email: foundMedic.email,
      };

      return res.status(200).json(sentMedic);
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching medic.' });
  }
}
