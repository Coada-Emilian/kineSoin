import Joi from 'joi';
import { Op } from 'sequelize';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import jsonwebtoken from 'jsonwebtoken';

import { checkPatientStatus } from '../../utils/checkPatientStatus.js';
import { checkIsIdNumber } from '../../utils/checkIsIdNumber.js';
import computeAge from '../../utils/computeAge.js';
import { Scrypt } from '../../authentification/Scrypt.js';
import { patientPhotoStorage } from '../../cloudinary/index.js';
import {
  Patient,
  Appointment,
  Admin,
  Affliction,
  Medic,
} from '../../models/associations.js';
import { application } from 'express';
import { parse } from 'dotenv';

const medicController = {
  getAllMedics: async (req, res) => {
    const foundMedics = await Medic.findAll({
      attributes: [
        'id',
        'name',
        'surname',
        'street_number',
        'street_name',
        'postal_code',
        'city',
        'phone_number',
        'licence_code',
      ],
    });
    if (!foundMedics) {
      return res.status(404).json({ message: 'No medics found.' });
    } else {
      const sentMedics = [];
      for (const medic of foundMedics) {
        const newMedic = {
          id: medic.id,
          fullName: `${medic.name} ${medic.surname}`,
          address: `${medic.street_number} ${medic.street_name}, ${medic.postal_code} ${medic.city}`,
          phone_number: medic.phone_number,
          licence_code: medic.licence_code,
        };
        sentMedics.push(newMedic);
      }
      return res.status(200).json(sentMedics);
    }
  },
};

export default medicController;
