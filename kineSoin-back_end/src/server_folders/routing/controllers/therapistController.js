import Joi from 'joi';
import { Op } from 'sequelize';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

import { checkPatientStatus } from '../../utils/checkPatientStatus.js';
import { checkIsIdNumber } from '../../utils/checkIsIdNumber.js';
import computeAge from '../../utils/computeAge.js';
import { Scrypt } from '../../authentification/Scrypt.js';
import { patientPhotoStorage } from '../../cloudinary/index.js';
import {
  Patient,
  Appointment,
  Patient_message,
} from '../../models/associations.js';
import { application } from 'express';
import { parse } from 'dotenv';

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
};

export default therapistController;
