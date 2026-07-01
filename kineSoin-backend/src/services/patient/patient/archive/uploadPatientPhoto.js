/**
 * @description Uploads and updates the authenticated patient’s profile picture,
 *              replacing any existing Cloudinary asset and persisting the new
 *              file metadata in the database.
 *
 * Rationale:
 * - Ensures only verified patients can modify their own profile media, protecting
 *   privacy and preventing unauthorized changes.
 * - Keeps the controller focused on validation, file‑handling logic, and predictable
 *   response formatting while delegating storage operations to Cloudinary and
 *   persistence to Sequelize models.
 *
 * Notes:
 * - Validates the patient ID before performing any write operation.
 * - Rejects requests without an uploaded file to prevent empty or invalid updates.
 * - Deletes the previous Cloudinary image when present to avoid orphaned assets.
 * - Saves both `picture_id` and `picture_url` for consistent frontend retrieval.
 * - Returns clear, consistent HTTP status codes for invalid input, missing records,
 *   successful uploads, and unexpected server errors.
 */

import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { patientPhotoStorage } from '../../../../cloudinary/index.js';
import { Patient } from '../../../../models/index.js';
import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';

multer({ storage: patientPhotoStorage });
export default async function uploadPatientPhoto(req, res) {
  const patient_id = parseInt(req.patient_id, 10);

  checkIsValidNumber(patient_id);

  if (!patient_id) {
    return res.status(400).json({ message: 'Patient not found' });
  } else {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: 'No file detected. Please upload a file to continue.',
        });
      } else {
        const { path, filename } = req.file;

        const foundPatient = await Patient.findByPk(patient_id);

        if (!foundPatient) {
          return res.status(400).json({ message: 'Patient not found' });
        } else {
          if (foundPatient.picture_id) {
            try {
              await cloudinary.uploader.destroy(foundPatient.picture_id);
            } catch (err) {
              console.error(
                'Error deleting old picture from Cloudinary:',
                err.message
              );
            }
          }

          foundPatient.picture_id = filename;

          foundPatient.picture_url = path;

          const response = await foundPatient.save();

          if (!response) {
            return res
              .status(400)
              .json({ message: 'Error saving the picture' });
          } else {
            return res.status(200).json({
              message: 'Picture uploaded successfully!',
              picture_url: foundPatient.picture_url,
            });
          }
        }
      }
    } catch (error) {
      console.error('Error uploading patient photo:', error.message);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
