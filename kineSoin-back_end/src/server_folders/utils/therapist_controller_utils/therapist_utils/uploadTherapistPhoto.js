import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { therapistPhotoStorage } from '../../../cloudinary/index.js';
import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { Therapist } from '../../../models/index.js';

multer({ storage: therapistPhotoStorage });

export default async function uploadTherapistPhoto(req, res) {
  const therapist_id = parseInt(req.therapist_id, 10);

  if (!therapist_id) {
    return res.status(400).json({ message: 'Therapist not found' });
  } else {
    try {
      checkIsValidNumber(therapist_id);

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
