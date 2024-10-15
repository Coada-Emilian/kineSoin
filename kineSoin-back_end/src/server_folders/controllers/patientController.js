import Joi from 'joi';
import { Op } from 'sequelize';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

import { checkPatientStatus } from '../utils/checkPatientStatus.js';
import { checkIsIdNumber } from '../utils/checkIsIdNumber.js';
import computeAge from '../utils/computeAge.js';
import { Scrypt } from '../authentification/Scrypt.js';
import { patientPhotoStorage } from '../cloudinary/index.js';
import { Patient, Appointment } from '../models/associations.js';
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
};

export default patientController;
