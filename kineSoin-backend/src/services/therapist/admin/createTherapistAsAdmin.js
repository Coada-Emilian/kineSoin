/**
 * @description Creates a new therapist account from the admin panel, validating
 *              all incoming data, enforcing uniqueness and password rules, and
 *              requiring a profile image before persisting the record.
 *
 * Rationale:
 * - Ensures only verified admins can create therapist accounts, protecting system
 *   integrity and preventing unauthorized onboarding.
 * - Keeps the controller focused on validation, structured input handling, and
 *   predictable response formatting while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates admin identity and all therapist fields through a Joi schema.
 * - Prevents duplicate accounts by checking email uniqueness.
 * - Enforces password confirmation and hashes credentials using Scrypt.
 * - Requires an uploaded profile image and stores both `picture_url` and `picture_id`.
 * - Rolls back Cloudinary uploads if database creation fails to avoid orphaned assets.
 * - Returns consistent HTTP status codes for validation errors, conflicts,
 *   missing files, successful creation, and unexpected server issues.
 */

import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { Scrypt } from '../../../authentication/Scrypt.js';
import { therapistPhotoStorage } from '../../../cloudinary/index.js';
import { Admin, Therapist } from '../../../models/index.js';
import { findOrThrow } from '../../../utils/findOrThrow.js';
import { getValidId } from '../../../utils/getValidId.js';
import createdTherapistSchema from '../../../validations/joi/creation/createdTherapistSchema.js';

multer({ storage: therapistPhotoStorage });

export default async function createTherapistAsAdmin(req, res) {
  const admin_id = getValidId(req.admin_id, 'Admin ID');

  await findOrThrow(Admin, admin_id, 'Admin');

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
  } catch (error) {
    console.error('Error creating therapist:', error);

    return res.status(500).json({
      message: 'Error creating therapist:',
      error: error.message,
    });
  }
}
