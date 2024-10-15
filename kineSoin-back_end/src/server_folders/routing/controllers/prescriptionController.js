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
  Prescription,
} from '../../models/associations.js';
import { application } from 'express';
import { parse } from 'dotenv';

const prescriptionController = {
  getAllPrescriptions: async (req, res) => {
    // const patientId = parseInt(req.patient_id, 10);
    const patientId = 1;
    checkIsIdNumber(patientId);

    const foundPatient = await Patient.findByPk(patientId, {
      attributes: ['id', 'name', 'surname', 'status'],
      include: [
        {
          association: 'prescriptions',
        },
      ],
    });
    checkPatientStatus(foundPatient);
    if (!foundPatient.prescriptions.length) {
      return res.status(200).json({ prescriptions: [] });
    } else {
      const prescriptions = foundPatient.prescriptions;
      res.status(200).json({ prescriptions });
    }
  },
  getOnePrescription: async (req, res) => {
    const prescriptionId = parseInt(req.params.id, 10);
    checkIsIdNumber(prescriptionId);
    const foundPrescription = await Prescription.findByPk(prescriptionId, {
      include: [
        {
          association: 'medic',
          attributes: ['id', 'name', 'surname'],
        },
        {
          association: 'patient',
          attributes: ['id', 'name', 'surname'],
        },
        {
          association: 'affliction',
          attributes: ['id', 'name', 'insurance_code'],
        },
      ],
    });
    if (!foundPrescription) {
      return res.status(400).json({ message: 'Prescription not found' });
    } else {
      return res.status(200).json(foundPrescription);
    }
  },
  addNewPrescription: async (req, res) => {
    // const patientId = parseInt(req.patient_id, 10);
    const patientId = 1;
    checkIsIdNumber(patientId);

    const foundPatient = await Patient.findByPk(patientId);
    checkPatientStatus(foundPatient);

    const prescriptionSchema = Joi.object({
      medic_id: Joi.number().integer().required(),
      affliction_id: Joi.number().integer().required(),
      appointment_quantity: Joi.number().integer().required(),
      at_home_care: Joi.boolean().required(),
      date: Joi.date().required(),
    });

    const { error } = prescriptionSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const {
      medic_id,
      affliction_id,
      appointment_quantity,
      at_home_care,
      date,
    } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ message: 'Please upload a prescription scan' });
    }

    const { filePath, filename } = req.file;

    const picture_url = filePath;
    const picture_id = filename;

    const uploadedPrescription = await Prescription.create({
      medic_id,
      patient_id: patientId,
      affliction_id,
      appointment_quantity,
      is_completed: false,
      at_home_care,
      date,
      picture_url,
      picture_id,
    });

    res.status(201).json({
      message: 'Prescription added successfully!',
      uploadedPrescription,
    });
  },
};

export default prescriptionController;
