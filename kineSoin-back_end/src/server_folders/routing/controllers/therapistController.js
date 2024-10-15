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
      attributes: ['id', 'name', 'surname'],
    });
    const currentDate = new Date().toISOString().split('T')[0];
    const sameDayAppointments = await Appointment.findAll({
      where: { therapist_id: therapistId, date: { [Op]: currentDate } },
      order: [['date', 'ASC']],
    });
    res.status(200).json({ foundTherapist, sameDayAppointments });
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
      repeated_password: Joi.string().min(12).max(255).optional(),
      picture_url: Joi.string().max(255).optional(),
      description: Joi.string().max(50).optional(),
    });

  }
};

export default therapistController;
