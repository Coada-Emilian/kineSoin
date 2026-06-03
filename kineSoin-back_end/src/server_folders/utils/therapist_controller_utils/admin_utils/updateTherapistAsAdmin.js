import { v2 as cloudinary } from 'cloudinary';
import Joi from 'joi';
import multer from 'multer';
import { therapistPhotoStorage } from '../../../cloudinary/index.js';
import { checkIsValidNumber } from '../../../middlewares/checkIsValidNumber.js';
import { Therapist } from '../../../models/index.js';

multer({ storage: therapistPhotoStorage });

export default async function updateTherapistAsAdmin(req, res) {
  const admin_id = parseInt(req.admin_id, 10);

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin not found' });
  } else {
    checkIsValidNumber(admin_id);

    try {
      const therapist_id = parseInt(req.params.therapist_id, 10);

      if (!therapist_id) {
        return res.status(400).json({ message: 'Therapist not found' });
      } else {
        checkIsValidNumber(therapist_id);

        const updatedTherapistSchema = Joi.object({
          status: Joi.string().valid('active', 'inactive').optional(),
          id: Joi.number().integer().optional(),
          name: Joi.string().max(50).allow('').optional(),
          surname: Joi.string().max(50).allow('').optional(),
          email: Joi.string().email().max(100).allow('').optional(),
          password: Joi.string().max(100).allow('').optional(),
          diploma: Joi.string().max(50).allow('').optional(),
          experience: Joi.string().max(50).allow('').optional(),
          specialty: Joi.string().max(50).allow('').optional(),
          phone_number: Joi.string().max(15).allow('').optional(),
          description: Joi.string().allow('').optional(),
          licence_code: Joi.string().max(9).allow('').optional(),
          prefix: Joi.string().max(10).allow('').optional(),
        }).min(1);

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
      }
    } catch (err) {
      console.error('Error updating therapist:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
