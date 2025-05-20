import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { Scrypt } from '../../../authentification/Scrypt.js';
import { therapistPhotoStorage } from '../../../cloudinary/index.js';
import { Therapist } from '../../../models/index.js';
import { checkIsValidNumber } from '../../checkIsValidNumber.js';

multer({ storage: therapistPhotoStorage });

export default async function createTherapistAsAdmin(req, res) {
  const admin_id = parseInt(req.admin_id, 10);

  checkIsValidNumber(admin_id);

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin not found' });
  } else {
    try {
      const createdTherapistSchema = Joi.object({
        name: Joi.string().max(50).required(),
        surname: Joi.string().max(50).required(),
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        password: Joi.string().min(12).max(255).required(),
        repeated_password: Joi.string().valid(Joi.ref('password')).required(),
        description: Joi.string().max(50).required(),
        diploma: Joi.string().max(50).required(),
        experience: Joi.string().max(50).required(),
        specialty: Joi.string().max(50).required(),
        prefix: Joi.string().max(10).required(),
        phone_number: Joi.string().max(15).required(),
        full_phone_number: Joi.string().max(15).optional(),
        licence_code: Joi.string().max(25).required(),
        status: Joi.string().valid('active', 'inactive').optional(),
      });

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

          if (!req.file) {
            return res.status(400).json({
              message: 'No file detected. Please upload a file to continue.',
            });
          } else {
            const picture_url = req.file.path;
            const picture_id = req.file.filename;

            const fullPhoneNumber = `${prefix}${phone_number}`;

            const newTherapist = {
              admin_id: adminId,
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
