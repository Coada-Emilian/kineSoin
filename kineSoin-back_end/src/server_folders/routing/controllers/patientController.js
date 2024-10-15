import Joi from 'joi';
import { Op } from 'sequelize';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

import { checkPatientStatus } from '../../utils/checkPatientStatus.js';
import { checkIsIdNumber } from '../../utils/checkIsIdNumber.js';
import computeAge from '../../utils/computeAge.js';
import { Scrypt } from '../../authentification/Scrypt.js';
import { patientPhotoStorage } from '../../cloudinary/index.js';
import { Patient, Appointment } from '../../models/associations.js';
import { application } from 'express';
import { parse } from 'dotenv';

multer({ storage: patientPhotoStorage });

const patientController = {
  getConnectedPatient: async (req, res) => {
    // const patientId = parseInt(req.patient_id, 10);
    const patientId = 1;
    checkIsIdNumber(patientId);
    const foundPatient = await Patient.findByPk(patientId, {
      attributes: {
        exclude: [
          'password',
          'old_password',
          'new_password',
          'repeated_password',
          'created_at',
          'updated_at',
          'picture_id',
          'gender',
          'birth_name',
        ],
      },
      include: [
        {
          association: 'prescriptions',
        },
      ],
    });
    checkPatientStatus(foundPatient);

    const address = `${foundPatient.street_number} ${foundPatient.street_name}, ${foundPatient.postal_code} ${foundPatient.city}`;

    const {
      name,
      surname,
      phone_number,
      email,
      status,
      picture_url,
      prescriptions,
    } = foundPatient;

    const sentPatientData = {
      name,
      surname,
      phone_number,
      email,
      status,
      picture_url,
      prescriptions,
      address,
      age: computeAge(foundPatient.birth_date),
    };

    res.status(200).json(sentPatientData);
  },
  deleteConnectedPatient: async (req, res) => {
    // const patientId = parseInt(req.patient_id, 10);
    const patientId = 1;
    checkIsIdNumber(patientId);
    const response = await Patient.destroy({ where: { id: patientId } });
    if (!response) {
      return res.status(400).json({ message: 'Patient not found' });
    } else {
      return res.status(200).json({ message: 'Patient deleted successfully!' });
    }
  },
  updateConnectedPatient: async (req, res) => {
    // const patientId = parseInt(req.patient_id, 10);
    const patientId = 1;
    checkIsIdNumber(patientId);

    const updatePatientSchema = Joi.object({
      name: Joi.string().max(50).optional(),
      surname: Joi.string().max(50).optional(),
      birth_date: Joi.date().optional(),
      gender: Joi.string().max(10).valid('male', 'female', 'other').optional(),
      street_number: Joi.string().optional(),
      street_name: Joi.string().max(50).optional(),
      postal_code: Joi.string().max(10).optional(),
      city: Joi.string().max(100).optional(),
      phone_number: Joi.string().max(15).optional(),
      email: Joi.string().email({ minDomainSegments: 2 }).optional(),
      new_password: Joi.string().min(12).max(255).optional(),
      repeated_password: Joi.string().valid(Joi.ref('new_password')).optional(),
      old_password: Joi.string()
        .when('new_password', {
          is: Joi.exist(),
          then: Joi.required(),
          otherwise: Joi.optional(),
        })
        .optional(),
      repeated_password: Joi.string().min(12).max(255).optional(),
      picture_url: Joi.string().max(255).optional(),
      picture_id: Joi.string().max(255).optional(),
    }).min(1);

    const { error } = updatePatientSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const foundPatient = await Patient.findByPk(patientId);

    if (!foundPatient) {
      return res.status(400).json({ message: 'Patient not found' });
    }

    checkPatientStatus(foundPatient);

    const {
      name,
      surname,
      birth_date,
      gender,
      street_number,
      street_name,
      postal_code,
      city,
      phone_number,
      email,
      old_password,
      new_password,
      repeated_password,
      picture_url,
      picture_id,
    } = req.body;

    const newProfile = {
      name: name || foundPatient.name,
      surname: surname || foundPatient.surname,
      birth_date: birth_date || foundPatient.birth_date,
      gender: gender || foundPatient.gender,
      street_number: street_number || foundPatient.street_number,
      street_name: street_name || foundPatient.street_name,
      postal_code: postal_code || foundPatient.postal_code,
      city: city || foundPatient.city,
      phone_number: phone_number || foundPatient.phone_number,
      email: email || foundPatient.email,
      picture_url: picture_url || foundPatient.picture_url,
      picture_id: picture_id || foundPatient.picture_id,
    };

    if (new_password) {
      if (!old_password) {
        return res.status(400).json({
          message: 'Old password is required to change the password.',
        });
      }

      const isOldPasswordValid = Scrypt.compare(
        old_password,
        foundUser.password
      );

      if (!isOldPasswordValid) {
        return res.status(400).json({ message: 'Incorrect old password' });
      }

      if (new_password !== repeated_password) {
        return res.status(400).json({ message: 'New passwords do not match' });
      }

      // Hash the new password
      const hashedNewPassword = Scrypt.hash(new_password);
      // Update the new profile object with the new password
      newProfile.password = hashedNewPassword;
    }

    await foundPatient.update(newProfile);

    return res.status(200).json({
      message: 'Profile updated successfully!',
      foundPatient,
      age: computeAge(foundPatient.birth_date),
    });
  },
  uploadPatientPhoto: async (req, res) => {
    const patientId = parseInt(req.patient_id, 10);
    checkIsIdNumber(patientId);

    if (!req.file) {
      return res.status(400).json({
        message: 'No file detected. Please upload a file to continue.',
      });
    }

    const { filePath, filename } = req.file;

    const foundPatient = await Patient.findByPk(patientId);

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
        foundPatient.picture_id = filename;
        foundPatient.picture_url = filePath;
        await foundPatient.save();

        return res.status(200).json({
          message: 'Picture uploaded successfully!',
          picture_url: filePath,
        });
      }
    }
  },
};

export default patientController;
