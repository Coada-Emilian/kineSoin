/**
 * @description Handles profile‑photo uploads for the authenticated therapist,
 *              replacing any existing Cloudinary image and updating the stored
 *              profile‑image metadata.
 *
 * Rationale:
 * - Ensures therapists can securely update their own profile picture while
 *   preventing orphaned Cloudinary assets through safe deletion of old images.
 * - Keeps the controller focused on validation, predictable responses, and
 *   minimal file‑handling logic while delegating persistence to Sequelize models.
 *
 * Notes:
 * - Validates the therapist ID before performing any write operation.
 * - Requires an uploaded file and rejects requests without one.
 * - Deletes the previous Cloudinary image when a new one is uploaded.
 * - Updates both `picture_id` and `picture_url` to reflect the new asset.
 * - Returns consistent HTTP status codes for missing records, missing files,
 *   successful uploads, and unexpected server errors.
 */

import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { therapistPhotoStorage } from '../../../../cloudinary/index.js';
import { Therapist } from '../../../../models/index.js';

multer({ storage: therapistPhotoStorage });

export default async function uploadTherapistPhoto(req, res) {
  const therapist_id = parseInt(req.therapist_id, 10);

  if (!therapist_id) {
    return res.status(400).json({ message: 'Therapist not found' });
  } else {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: 'No file detected. Please upload a file to continue.',
        });
      }

      const foundTherapist = await Therapist.findByPk(therapist_id);

      if (!foundTherapist) {
        return res.status(400).json({ message: 'Therapist not found' });
      } else {
        if (foundTherapist.picture_id) {
          try {
            await cloudinary.uploader.destroy(foundTherapist.picture_id);
          } catch (err) {
            console.error(
              'Error deleting old picture from Cloudinary:',
              err.message
            );
          }
          const { filePath, filename } = req.file;

          foundTherapist.picture_id = filename;

          foundTherapist.picture_url = filePath;

          await foundTherapist.save();

          return res.status(200).json({
            message: 'Picture uploaded successfully!',
            picture_url: filePath,
          });
        }
      }
    } catch (error) {
      console.error('Error fetching therapist data:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
