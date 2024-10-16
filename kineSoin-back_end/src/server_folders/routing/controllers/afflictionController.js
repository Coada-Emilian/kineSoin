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
  createAffliction: async (req, res) => {
    const admin_id = parseInt(req.admin.id, 10);
    checkIsIdNumber(admin_id);

    const newAfflictionSchema = Joi.object({
        body_region_id: Joi.number().integer().required(),
        name: Joi.string().max(50).required(),
        description: Joi.string().required(),
        insurance_code: Joi.string().max(255).required(),
        is_operated: Joi.boolean().required(),
    })
    const { error } = newAfflictionSchema.validate(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message});
    } else {
        const { body_region_id, name, description, insurance_code, is_operated } = req.body;
        const newAffliction = await Affliction.create({
            admin_id,
            body_region_id,
            name,
            description,
            insurance_code,
            is_operated,
        });
        if(!newAffliction){
            return res.status(500).json({message: 'Error while creating affliction.'});
        } else {
            return res.status(201).json({newAffliction});
        }
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
