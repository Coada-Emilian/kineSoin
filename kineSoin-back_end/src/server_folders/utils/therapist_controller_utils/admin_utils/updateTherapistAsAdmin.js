/**
 * @function updateTherapistAsAdmin
 * @description
 * Handles the update of an existing therapist profile from the admin panel.
 *
 * This controller:
 * - Validates the admin ID from the request using `getValidId`.
 * - Extracts and validates the therapist ID from route parameters.
 * - Validates incoming update data using a Joi schema (`updatedTherapistSchema`).
 * - Retrieves the existing therapist from the database.
 * - Merges incoming fields with existing values to allow partial updates.
 * - Builds a formatted full phone number from prefix and phone number.
 * - Handles optional profile picture upload via Multer + Cloudinary.
 *   - Deletes the previous Cloudinary image if it exists.
 *   - Stores new image metadata (url and public_id/filename).
 * - Updates the therapist record in the database.
 *
 * Error handling:
 * - Returns 400 if request body is missing or invalid.
 * - Returns 400 if therapist is not found.
 * - Returns 400 if update validation fails.
 * - Returns 500 for unexpected server or database errors.
 *
 * Side effects:
 * - May delete an existing image from Cloudinary.
 * - May upload a new profile image.
 * - Updates therapist record in the database.
 *
 * @param {Object} req - Express request object.
 *   - `req.admin_id` {number} Admin ID injected by authentication middleware.
 *   - `req.params.therapist_id` {string|number} Therapist ID to update.
 *   - `req.body` {Object} Therapist update data.
 *   - `req.file` {Object|undefined} Optional uploaded image file (Multer + Cloudinary storage).
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response confirming success or describing the error.
 */

import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { therapistPhotoStorage } from '../../../cloudinary/index.js';
import { getValidId } from '../../../middlewares/getValidId.js';
import { Therapist } from '../../../models/index.js';
import updatedTherapistSchema from '../../joi_validations/update_validations/updatedTherapistSchema.js';

multer({ storage: therapistPhotoStorage });

export default async function updateTherapistAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  try {
    const therapist_id = getValidId(req.params.therapist_id, 'Therapist ID');

    if (!req.body) {
      return res.status(400).json({
        message: 'Please provide the data to update the therapist',
      });
    } else {
      const { error } = updatedTherapistSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ message: error.message });
      } else {
        const foundTherapist = await Therapist.findByPk(therapist_id);

        if (!foundTherapist) {
          return res.status(400).json({ message: 'Therapist not found' });
        }

        const {
          status,
          name,
          email,
          surname,
          diploma,
          experience,
          specialty,
          phone_number,
          description,
          licence_code,
          prefix,
        } = req.body;

        const fullPhoneNumber = `${prefix}${phone_number}`;

        const newProfile = {
          status: status || foundTherapist.status,
          name: name || foundTherapist.name,
          surname: surname || foundTherapist.surname,
          diploma: diploma || foundTherapist.diploma,
          email: email || foundTherapist.email,
          experience: experience || foundTherapist.experience,
          specialty: specialty || foundTherapist.specialty,
          phone_number: phone_number || foundTherapist.phone_number,
          description: description || foundTherapist.description,
          licence_code: licence_code || foundTherapist.licence_code,
          prefix: prefix || foundTherapist.prefix,
          full_phone_number: fullPhoneNumber,
        };

        if (req.file) {
          if (foundTherapist.picture_id) {
            try {
              await cloudinary.uploader.destroy(foundTherapist.picture_id);
            } catch (err) {
              console.error(
                'Error deleting old picture from Cloudinary:',
                err.message
              );
            }
          }
          const { path, filename } = req.file;

          newProfile.picture_id = filename;

          newProfile.picture_url = path;
        }
        const response = await foundTherapist.update(newProfile);

        if (!response) {
          return res.status(400).json({ message: 'Therapist not updated' });
        } else {
          return res
            .status(200)
            .json({ message: 'Therapist updated successfully!' });
        }
      }
    }
  } catch (err) {
    console.error('Error updating therapist:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
