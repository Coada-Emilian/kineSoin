import Joi from 'joi';
import { Op } from 'sequelize';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

import { checkPatientStatus } from '../../utils/checkPatientStatus.js';
import { checkIsIdNumber } from '../../utils/checkIsIdNumber.js';
import computeAge from '../../utils/computeAge.js';
import { Scrypt } from '../../authentification/Scrypt.js';
import { therapistPhotoStorage } from '../../cloudinary/index.js';
import {
  Patient,
  Appointment,
  Patient_message,
  Therapist,
} from '../../models/associations.js';
import { application } from 'express';
import { parse } from 'dotenv';

multer({ storage: therapistPhotoStorage });

const therapistController = {
  getPersonalTherapist: async (req, res) => {
    // const patientId = parseInt(req.patient_id, 10);
    const patientId = 1;

    checkIsIdNumber(patientId);

    const foundPatient = await Patient.findByPk(patientId, {
      attributes: ['id', 'name', 'surname', 'status'],
      include: [
        {
          association: 'therapist',
          attributes: [
            'id',
            'name',
            'surname',
            'description',
            'diploma',
            'experience',
            'specialty',
            'picture_url',
          ],
        },
      ],
    });

    checkPatientStatus(foundPatient);

    if (!foundPatient.therapist) {
      return res.status(200).json({
        message: "Ce patient n'a pas de praticien!",
        therapist: null,
      });
    } else {
      const therapist = foundPatient.therapist;
      res.status(200).json({ therapist });
    }
  },
  getConnectedTherapist: async (req, res) => {
    // const therapistId = parseInt(req.therapist_id, 10);
    const therapistId = 1;
    checkIsIdNumber(therapistId);

    const foundTherapist = await Therapist.findByPk(therapistId, {
      attributes: [
        'id',
        'name',
        'surname',
        'picture_url',
        'description',
        'diploma',
        'experience',
        'specialty',
        'email',
      ],
    });
    if (!foundTherapist) {
      return res.status(400).json({ message: 'Therapist not found' });
    }
    const sentTherapist = {
      id: foundTherapist.id,
      name: foundTherapist.name,
      surname: foundTherapist.surname,
      fullName: `${foundTherapist.name} ${foundTherapist.surname}`,
      picture_url: foundTherapist.picture_url,
      description: foundTherapist.description,
      diploma: foundTherapist.diploma,
      experience: foundTherapist.experience,
      specialty: foundTherapist.specialty,
      email: foundTherapist.email,
    };
    const currentDate = new Date().toISOString().split('T')[0];
    const sameDayAppointments = await Appointment.findAll({
      where: {
        therapist_id: therapistId,
        is_accepted: true,
        is_canceled: false,
        date: { [Op]: currentDate },
      },
      order: [['time', 'ASC']],
    });
    res.status(200).json({ sentTherapist, sameDayAppointments });
  },
  deleteConnectedTherapist: async (req, res) => {
    // const therapistId = parseInt(req.therapist_id, 10);
    const therapistId = 1;
    checkIsIdNumber(therapistId);
    const response = await Therapist.destroy({ where: { id: therapistId } });

    if (!response) {
      return res.status(400).json({ message: 'Therapist not found' });
    } else {
      return res
        .status(200)
        .json({ message: 'Therapist deleted successfully!' });
    }
  },
  updateConnectedTherapist: async (req, res) => {
    // const therapistId = parseInt(req.therapist_id, 10);
    const therapistId = 1;
    checkIsIdNumber(therapistId);

    const updateTherapistSchema = Joi.object({
      name: Joi.string().max(50).optional(),
      surname: Joi.string().max(50).optional(),
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
      picture_url: Joi.string().max(255).optional(),
      picture_id: Joi.string().max(255).optional(),
      description: Joi.string().max(50).optional(),
      diploma: Joi.string().max(50).optional(),
      experience: Joi.string().max(50).optional(),
      specialty: Joi.string().max(50).optional(),
    }).min(1);

    const { error } = updateTherapistSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const foundTherapist = await Therapist.findByPk(therapistId);

    if (!foundTherapist) {
      return res.status(400).json({ message: 'Therapist not found' });
    }

    const {
      name,
      surname,
      email,
      new_password,
      old_password,
      picture_url,
      picture_id,
      description,
      diploma,
      experience,
      specialty,
    } = req.body;

    const newProfile = {
      name: name || foundTherapist.name,
      surname: surname || foundTherapist.surname,
      email: email || foundTherapist.email,
      picture_url: picture_url || foundTherapist.picture_url,
      picture_id: picture_id || foundTherapist.picture_id,
      description: description || foundTherapist.description,
      diploma: diploma || foundTherapist.diploma,
      experience: experience || foundTherapist.experience,
      specialty: specialty || foundTherapist.specialty,
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

    await foundTherapist.update(newProfile);

    return res
      .status(200)
      .json({ message: 'Therapist updated successfully!', foundTherapist });
  },
  uploadTherapistPhoto: async (req, res) => {
    const therapistId = parseInt(req.therapist_id, 10);
    checkIsIdNumber(therapistId);

    if (!req.file) {
      return res.status(400).json({
        message: 'No file detected. Please upload a file to continue.',
      });
    }

    const foundTherapist = await Therapist.findByPk(therapistId);

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
        foundTherapist.picture_id = filename;
        foundTherapist.picture_url = filePath;
        await foundTherapist.save();

        return res.status(200).json({
          message: 'Picture uploaded successfully!',
          picture_url: filePath,
        });
      }
    }
  },
  getAllTherapists: async (req, res) => {
    const therapists = await Therapist.findAll({
      attributes: [
        'id',
        'name',
        'surname',
        'description',
        'diploma',
        'experience',
        'specialty',
        'picture_url',
      ],
    });

    if (!therapists) {
      return res.status(400).json({ message: 'No therapists found' });
    }

    return res.status(200).json({ therapists });
  },
  getOneTherapist: async (req, res) => {
    const therapistId = parseInt(req.params.therapist_id, 10);
    checkIsIdNumber(therapistId);

    const foundTherapist = await Therapist.findByPk(therapistId, {
      attributes: [
        'id',
        'name',
        'surname',
        'description',
        'diploma',
        'experience',
        'specialty',
        'picture_url',
      ],
    });

    if (!foundTherapist) {
      return res.status(400).json({ message: 'Therapist not found' });
    }

    const sentTherapist = {
      id: foundTherapist.id,
      fullName: `${foundTherapist.name} ${foundTherapist.surname}`,
      picture_url: foundTherapist.picture_url,
      description: foundTherapist.description,
      diploma: foundTherapist.diploma,
      experience: foundTherapist.experience,
      specialty: foundTherapist.specialty,
    };
    return res.status(200).json({ sentTherapist });
  },
  deleteTherapist: async (req, res) => {
    const therapistId = parseInt(req.params.therapist_id, 10);
    checkIsIdNumber(therapistId);

    const response = await Therapist.destroy({ where: { id: therapistId } });

    if (!response) {
      return res.status(400).json({ message: 'Therapist not found' });
    } else {
      return res
        .status(200)
        .json({ message: 'Therapist deleted successfully!' });
    }
  },
};

export default therapistController;
