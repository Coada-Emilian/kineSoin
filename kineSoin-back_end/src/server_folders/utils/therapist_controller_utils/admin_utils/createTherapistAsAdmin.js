/**
 * @function createTherapistAsAdmin
 * @description
 * Handles the creation of a new therapist account from the admin panel.
 *
 * This controller:
 * - Validates the admin ID using `getValidId`.
 * - Validates request body using Joi schema (`createdTherapistSchema`).
 * - Ensures required therapist data is provided.
 * - Checks if a therapist with the same email already exists.
 * - Verifies that password and repeated password match.
 * - Hashes the password using Scrypt before storing it.
 * - Requires an uploaded profile image via Multer + Cloudinary.
 * - Builds and stores therapist profile data including full phone number.
 * - Creates a new therapist record in the database.
 *
 * Behavior:
 * - Prevents duplicate therapist creation using email uniqueness check.
 * - Ensures password security through hashing.
 * - Ensures profile image is uploaded before creation.
 * - Rolls back uploaded image from Cloudinary if creation fails.
 *
 * Error handling:
 * - Returns 400 if admin ID is invalid.
 * - Returns 400 if request body is missing or invalid.
 * - Returns 400 if validation fails.
 * - Returns 400 if therapist already exists.
 * - Returns 400 if passwords do not match.
 * - Returns 400 if no image file is provided.
 * - Returns 500 for unexpected server/database errors.
 *
 * @param {Object} req - Express request object.
 *   - `req.admin_id` {number} Admin ID injected by authentication middleware.
 *   - `req.body` {Object} Therapist creation data including credentials and profile info.
 *   - `req.file` {Object} Uploaded image file (Multer + Cloudinary storage).
 *
 * @param {Object} res - Express response object used to return JSON responses.
 *
 * @returns {Object} JSON response confirming creation or describing the error.
 *
 * @sideEffects
 * - Creates a new therapist in the database.
 * - Uploads and potentially deletes images in Cloudinary on failure.
 * - Hashes and stores sensitive password securely.
 */

import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { Scrypt } from '../../../authentification/Scrypt.js';
import { therapistPhotoStorage } from '../../../cloudinary/index.js';
import { getValidId } from '../../../middlewares/getValidId.js';
import { Therapist } from '../../../models/index.js';
import createdTherapistSchema from '../../joi_validations/creation_validations/createdTherapistSchema.js';

multer({ storage: therapistPhotoStorage });

export default async function createTherapistAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin not found' });
  } else {
    try {
      if (!req.body) {
        return res.status(400).json({
          message: 'Please provide the data to create the therapist',
        });
      } else {
        const { error } = createdTherapistSchema.validate(req.body);

        if (error) {
          return res.status(400).json({ message: error.message });
        }

        const {
          name,
          surname,
          email,
          password,
          repeated_password,
          description,
          diploma,
          experience,
          specialty,
          prefix,
          phone_number,
          licence_code,
          status,
        } = req.body;

        const foundTherapist = await Therapist.findOne({
          where: { email },
        });

        if (foundTherapist) {
          return res.status(400).json({ message: 'Therapist already exists' });
        } else if (password !== repeated_password) {
          return res.status(400).json({ message: 'Passwords do not match' });
        } else {
          const hashedPassword = Scrypt.hash(password);

          const fullPhoneNumber = `${prefix}${phone_number}`;

          if (!req.file) {
            return res.status(400).json({
              message: 'No file detected. Please upload a file to continue.',
            });
          } else {
            const picture_url = req.file.path;
            const picture_id = req.file.filename;

            const newTherapist = {
              admin_id,
              name,
              surname,
              email,
              password: hashedPassword,
              picture_url,
              picture_id,
              description,
              diploma,
              experience,
              specialty,
              prefix,
              phone_number,
              full_phone_number: fullPhoneNumber,
              licence_code,
              status: status || 'active',
            };

            const createdTherapist = await Therapist.create(newTherapist);

            if (!createdTherapist) {
              try {
                await cloudinary.uploader.destroy(picture_id);
              } catch (err) {
                console.error(
                  'Error deleting old picture from Cloudinary:',
                  err.message
                );
              }
              return res
                .status(400)
                .json({ message: 'The therapist was not created' });
            } else {
              return res.status(201).json({
                message: 'Therapist created successfully!',
              });
            }
          }
        }
      }
    } catch (err) {
      console.error('Error creating therapist:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
