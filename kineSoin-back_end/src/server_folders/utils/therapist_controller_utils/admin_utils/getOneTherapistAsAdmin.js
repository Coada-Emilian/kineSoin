/**
 * @function getOneTherapistAsAdmin
 *
 * @description
 * Retrieves detailed information about a single therapist for administrative purposes.
 *
 * This controller:
 * - Extracts and validates the admin ID from the request object.
 * - Ensures the admin ID is a valid number using a utility validator.
 * - Extracts and validates the therapist ID from route parameters.
 * - Fetches the therapist from the database using primary key lookup.
 * - Excludes sensitive or internal fields from the response (e.g. passwords, timestamps, file identifiers).
 * - Computes additional derived fields such as full name and full phone number.
 * - Returns a sanitized therapist object to the admin.
 *
 * Response enhancements:
 * - fullName: concatenation of therapist name and surname.
 * - fullPhoneNumber: concatenation of prefix and phone number.
 *
 * Error handling:
 * - Returns 400 if therapist_id is missing, invalid, or not found.
 * - Returns 500 for unexpected server or database errors.
 *
 * @param {Object} req - Express request object. Requires `req.admin_id` and `req.params.therapist_id`.
 * @param {Object} res - Express response object used to return JSON data or error messages.
 *
 * @returns {Object} JSON response containing therapist details or an error message.
 */

import { getValidId } from '../../../middlewares/getValidId.js';
import { Therapist } from '../../../models/index.js';

export default async function getOneTherapistAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  const therapist_id = getValidId(req.params.therapist_id, 'Therapist ID');

  try {
    const foundTherapist = await Therapist.findByPk(therapist_id, {
      attributes: {
        exclude: [
          'password',
          'old_password',
          'new_password',
          'repeated_password',
          'created_at',
          'updated_at',
          'picture_id',
        ],
      },
    });

    if (!foundTherapist) {
      return res.status(400).json({ message: 'Therapist not found' });
    }
    const fullPhoneNumber = `${foundTherapist.prefix}${foundTherapist.phone_number}`;

    const fullName = `${foundTherapist.name} ${foundTherapist.surname}`;

    return res
      .status(200)
      .json({ ...foundTherapist.dataValues, fullName, fullPhoneNumber });
  } catch (err) {
    console.error('Error fetching therapist:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
