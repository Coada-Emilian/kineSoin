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
} from '../../models/associations.js';
import { application } from 'express';
import { parse } from 'dotenv';

const afflictionController = {
  getAllAfflictions: async (req, res) => {
    const foundAfflictions = await Affliction.findAll({
      attributes: [
        'id',
        'name',
        'description',
        'insurance_code',
        'is_operated',
      ],
      include: [
        {
          association: 'body_region',
          attributes: ['id', 'name'],
        },
      ],
    });
    if (!foundAfflictions) {
      return res.status(404).json({ message: 'No afflictions found.' });
    } else {
      return res.status(200).json({ foundAfflictions });
    }
  },
  getOneAffliction: async (req, res) => {
    const affliction_id = parseInt(req.params.affliction_id, 10);
    checkIsIdNumber(affliction_id);

    const foundAffliction = await Affliction.findOne({
      where: { id: affliction_id },
      attributes: [
        'id',
        'name',
        'description',
        'insurance_code',
        'is_operated',
      ],
      include: [
        {
          association: 'body_region',
          attributes: ['id', 'name'],
        },
      ],
    });
    if (!foundAffliction) {
      return res.status(404).json({ message: 'Affliction not found.' });
    } else {
      return res.status(200).json({ foundAffliction });
    }
  },
};

export default afflictionController;
