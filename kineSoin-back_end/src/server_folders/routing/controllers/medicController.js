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
import { check } from 'prettier';

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
  getOneMedic: async (req, res) => {
    const medic_id = parseInt(req.params.medic_id, 10);
    checkIsIdNumber(medic_id);
    const foundMedic = await Medic.findByPk(medic_id, {
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
    if (!foundMedic) {
      return res.status(404).json({ message: 'No medic found.' });
    } else {
      const sentMedic = {
        id: foundMedic.id,
        fullName: `${foundMedic.name} ${foundMedic.surname}`,
        address: `${foundMedic.street_number} ${foundMedic.street_name}, ${foundMedic.postal_code} ${foundMedic.city}`,
        phone_number: foundMedic.phone_number,
        licence_code: foundMedic.licence_code,
      };
      return res.status(200).json(sentMedic);
    }
  },
  createMedic: async (req, res) => {
    const admin_id = parseInt(req.admin_id, 10);
    checkIsIdNumber(admin_id);

    const medicSchema = Joi.object({
      name: Joi.string().required(),
      surname: Joi.string().required(),
      street_number: Joi.string().optional(),
      street_name: Joi.string().required(),
      postal_code: Joi.string().required(),
      city: Joi.string().required(),
      phone_number: Joi.string().required(),
      licence_code: Joi.string().required(),
    });
    const { error } = medicSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const {
      name,
      surname,
      street_number,
      street_name,
      postal_code,
      city,
      phone_number,
      licence_code,
    } = req.body;
    const newMedic = {
      admin_id,
      name,
      surname,
      street_number,
      street_name,
      postal_code,
      city,
      phone_number,
      licence_code,
    };
    const createdMedic = await Medic.create(newMedic);
    if (!createdMedic) {
      return res.status(500).json({ message: 'Error while creating medic.' });
    } else {
      return res.status(201).json({ message: 'Medic created.', createdMedic });
    }
  },
  updateMedic: async (req, res) => {
    const admin_id = parseInt(req.admin_id, 10);
    checkIsIdNumber(admin_id);
    const medic_id = parseInt(req.params.medic_id, 10);
    checkIsIdNumber(medic_id);
    const medicUpdateSchema = Joi.object({
      name: Joi.string().optional(),
      surname: Joi.string().optional(),
      street_number: Joi.string().optional(),
      street_name: Joi.string().optional(),
      postal_code: Joi.string().optional(),
      city: Joi.string().optional(),
      phone_number: Joi.string().optional(),
      licence_code: Joi.string().optional(),
    }).min(1);

    const { error } = medicUpdateSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    } else {
      const {
        name,
        surname,
        street_number,
        street_name,
        postal_code,
        city,
        phone_number,
        licence_code,
      } = req.body;

      const foundMedic = await Medic.findByPk(medic_id);
      if (!foundMedic) {
        return res.status(404).json({ message: 'Medic not found.' });
      } else {
        const newMedic = {
          admin_id,
          name: name || foundMedic.name,
          surname: surname || foundMedic.surname,
          street_number: street_number || foundMedic.street_number,
          street_name: street_name || foundMedic.street_name,
          postal_code: postal_code || foundMedic.postal_code,
          city: city || foundMedic.city,
          phone_number: phone_number || foundMedic.phone_number,
          licence_code: licence_code || foundMedic.licence_code,
        };
        const updatedMedic = await Medic.update(newMedic);
        if (!updatedMedic) {
          return res
            .status(500)
            .json({ message: 'Error while updating medic.' });
        } else {
          return res
            .status(200)
            .json({ message: 'Medic updated successfully.', updatedMedic });
        }
      }
    }
  },
  deleteMedic: async (req, res) => {
    const medic_id = parseInt(req.params.medic_id, 10);
    checkIsIdNumber(medic_id);
    const foundMedic = await Medic.findByPk(medic_id);
    if (!foundMedic) {
      return res.status(404).json({ message: 'Medic not found.' });
    } else {
      const deletedMedic = await Medic.destroy({ where: { id: medic_id } });
      if (!deletedMedic) {
        return res.status(500).json({ message: 'Error while deleting medic.' });
      } else {
        return res
          .status(200)
          .json({ message: 'Medic deleted successfully.', deletedMedic });
      }
    }
  },
};

export default medicController;
