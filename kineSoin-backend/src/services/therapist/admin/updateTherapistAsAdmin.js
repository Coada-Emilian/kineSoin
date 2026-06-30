/**
 * @description Updates a therapist’s profile from the admin panel, validating
 *              all incoming fields, applying partial updates, and handling
 *              profile‑image replacement through Cloudinary when necessary.
 *
 * Rationale:
 * - Ensures only verified admins can modify therapist accounts, protecting system
 *   integrity and preventing unauthorized administrative changes.
 * - Keeps the controller focused on validation, structured input handling, and
 *   predictable response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates admin and therapist IDs before performing any write operation.
 * - Applies Joi validation to all updatable fields, supporting partial updates.
 * - Computes and updates `full_phone_number` for consistent formatting.
 * - Replaces profile images safely by deleting the old Cloudinary asset when a new
 *   file is uploaded.
 * - Returns consistent HTTP status codes for validation errors, missing records,
 *   failed updates, successful updates, and unexpected server issues.
 */

import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { therapistPhotoStorage } from '../../../cloudinary/index.js';
import { Admin, Therapist } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';
import updatedTherapistSchema from '../../../validations/joi/update/updatedTherapistSchema.js';

multer({ storage: therapistPhotoStorage });

export default async function updateTherapistAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

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
        };

        newProfile.full_phone_number = full_phone_number;

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
  } catch (error) {
    console.error('Error updating therapist:', error);

    return res.status(500).json({
      message: 'Error updating therapist:',
      error: error.message,
    });
  }
}
